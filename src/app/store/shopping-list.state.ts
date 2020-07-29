import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext, Store, NgxsAfterBootstrap } from '@ngxs/store';
import { produce } from 'immer';
import { combineLatest, interval } from 'rxjs';
import { map, first, flatMap } from 'rxjs/operators';

import { OneStoreInstanceInfo } from 'src/app/one-store';
import { OneStoreManagerService } from 'src/app/one-store-manager.service';
import {
    ShoppingItemFound,
    ShoppingItemBackToNeeded,
    AddShoppingItem,
    RemoveShoppingItem,
    ClearShoppingList,
    RefreshShoppingList,
} from './shopping-list.actions';
import { SettingsState } from './settings.state';
import { UserState } from './user.state';
import { UserConnected } from './user.actions';

export type ShoppingItemStatus = 'NEEDED' | 'FOUND' | 'OLD';

export interface ShoppingItem {
    label: string;
    status: ShoppingItemStatus;
}

export interface CurrentListItemCount {
    needed: number;
    found: number;
    total: number;
}

const statusIndex = {
    NEEDED: 0,
    FOUND: 1,
    OLD: 2,
};

export function shoppingItemComparator(a: ShoppingItem, b: ShoppingItem) {
    if (a.status !== b.status) {
        return statusIndex[a.status] - statusIndex[b.status];
    }
    return a.label.toLocaleLowerCase().localeCompare(b.label.toLocaleLowerCase());
}

const REFRESH_INTERVAL = 5_000;

@State<ShoppingItem[]>({
    name: 'shoppingList',
    defaults: [],
})
@Injectable()
export class ShoppingListState implements NgxsAfterBootstrap {
    @Selector()
    static currentListItems(state: ShoppingItem[]) {
        return state.filter(({ status }) => status === 'NEEDED' || status === 'FOUND').sort(shoppingItemComparator);
    }
    @Selector()
    static currentListItemCount(state: ShoppingItem[]): CurrentListItemCount {
        const currentList = ShoppingListState.currentListItems(state);
        const needed = currentList.filter(({ status }) => status === 'NEEDED').length;
        const found = currentList.filter(({ status }) => status === 'FOUND').length;
        const total = currentList.length;
        return { needed, found, total };
    }

    @Selector()
    static oldItems(state: ShoppingItem[]) {
        return state.filter(({ status }) => status === 'OLD').sort(shoppingItemComparator);
    }

    constructor(private ngxsStore: Store, private oneStoreMgr: OneStoreManagerService) {}

    @Action(ShoppingItemFound)
    itemFound(ctx: StateContext<ShoppingItem[]>, action: ShoppingItemFound) {
        ctx.setState(
            produce(ctx.getState(), (state) => {
                const item = state.find((shoppingItem) => shoppingItem.label === action.label);
                if (item) {
                    item.status = 'FOUND';
                    this.updateItemInOneStore({ ...item });
                }
            })
        );
    }

    @Action(ShoppingItemBackToNeeded)
    itemBackToNeeded(ctx: StateContext<ShoppingItem[]>, action: ShoppingItemBackToNeeded) {
        ctx.setState(
            produce(ctx.getState(), (state) => {
                const item = state.find((shoppingItem) => shoppingItem.label === action.label);
                if (item) {
                    item.status = 'NEEDED';
                    this.updateItemInOneStore({ ...item });
                }
            })
        );
    }

    @Action(AddShoppingItem)
    addItem(ctx: StateContext<ShoppingItem[]>, action: AddShoppingItem) {
        ctx.setState(
            produce(ctx.getState(), (state) => {
                const item = state.find((shoppingItem) => shoppingItem.label === action.label);
                if (item) {
                    throw new Error(`"${action.label}" item already exist`);
                } else {
                    const newItem: ShoppingItem = { label: action.label, status: 'NEEDED' };
                    state.push(newItem);
                    this.addItemToOneStore({ ...newItem });
                }
            })
        );
    }

    @Action(RemoveShoppingItem)
    removeItem(ctx: StateContext<ShoppingItem[]>, action: RemoveShoppingItem) {
        ctx.setState(
            produce(ctx.getState(), (state) => {
                const index = state.findIndex((item) => item.label === action.label);
                if (index >= 0) {
                    state.splice(index, 1);
                    this.removeItemInOneStore({ ...state[index] });
                }
            })
        );
    }

    @Action(ClearShoppingList)
    clearList(ctx: StateContext<ShoppingItem[]>) {
        ctx.setState(
            produce(ctx.getState(), (state) => {
                for (const item of state) {
                    if (item.status === 'NEEDED' || item.status === 'FOUND') {
                        item.status = 'OLD';
                        this.updateItemInOneStore({ ...item });
                    }
                }
            })
        );
    }

    ngxsAfterBootstrap(ctx: StateContext<ShoppingItem[]>) {
        ctx.dispatch(new RefreshShoppingList());
        interval(REFRESH_INTERVAL).subscribe(() => {
            ctx.dispatch(new RefreshShoppingList());
        });
    }

    @Action(UserConnected)
    refreshOnLogin(ctx: StateContext<ShoppingItem[]>) {
        ctx.dispatch(new RefreshShoppingList());
    }

    @Action(RefreshShoppingList)
    refreshShoppingList(ctx: StateContext<ShoppingItem[]>) {
        this.getOneStoreInstanceInfos()
            .pipe(
                flatMap((instance) => this.oneStoreMgr.getShoppingList(instance)),
                first()
            )
            .subscribe((remoteState) => {
                ctx.setState(
                    produce(ctx.getState(), (draft) => {
                        console.debug('[Sync] Start sync');
                        // remove no longer existing items
                        const itemsToRemove = [];
                        for (let i = 0; i < draft.length; i++) {
                            const item = draft[i];
                            let found = false;
                            for (const rItem of remoteState) {
                                if (item.label === rItem.label) {
                                    found = true;
                                    break;
                                }
                            }
                            if (!found) {
                                itemsToRemove.push(i);
                            }
                        }
                        itemsToRemove.forEach((i) => {
                            console.debug('[Sync] Remove item', draft[i]);
                            draft.splice(i, 1);
                        });
                        // add missing items + sync status
                        for (const rItem of remoteState) {
                            let found = false;
                            for (const item of draft) {
                                if (item.label === rItem.label) {
                                    found = true;
                                    if (item.status !== rItem.status) {
                                        console.debug(
                                            '[Sync] Change item status from',
                                            item.status,
                                            'to',
                                            rItem.status
                                        );
                                        item.status = rItem.status;
                                    }
                                    break;
                                }
                            }
                            if (!found) {
                                console.debug('[Sync] Add missing item', rItem);
                                draft.push(rItem);
                            }
                        }
                        console.debug('[Sync] End sync');
                    })
                );
            });
    }

    private addItemToOneStore(item: ShoppingItem) {
        this.getOneStoreInstanceInfos()
            .pipe(
                flatMap((instance) => this.oneStoreMgr.createOneShoppingItem(instance, item)),
                first()
            )
            .subscribe();
    }

    private updateItemInOneStore(item: ShoppingItem) {
        this.getOneStoreInstanceInfos()
            .pipe(
                flatMap((instance) => this.oneStoreMgr.updateOneShoppingItem(instance, item)),
                first()
            )
            .subscribe();
    }

    private removeItemInOneStore(item: ShoppingItem) {
        this.getOneStoreInstanceInfos()
            .pipe(
                flatMap((instance) => this.oneStoreMgr.deleteOneShoppingItem(instance, item)),
                first()
            )
            .subscribe();
    }

    private getOneStoreInstanceInfos() {
        return combineLatest([this.ngxsStore.selectOnce(SettingsState), this.ngxsStore.selectOnce(UserState)]).pipe(
            map(
                ([settingsState, userState]): OneStoreInstanceInfo => ({
                    onestoreUrl: settingsState.onestoreUrl,
                    username: settingsState.onestoreShoppingListOwner,
                    token: userState.tokenInfo.access_token,
                })
            ),
            first()
        );
    }
}
