import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { produce } from 'immer';

import {
    ShoppingItemFound,
    ShoppingItemBackToNeeded,
    AddShoppingItem,
    RemoveShoppingItem,
    ClearShoppingList,
} from './shopping-list.actions';

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

@State<ShoppingItem[]>({
    name: 'shoppingList',
    defaults: [],
})
@Injectable()
export class ShoppingListState {
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

    @Action(ShoppingItemFound)
    itemFound(ctx: StateContext<ShoppingItem[]>, action: ShoppingItemFound) {
        ctx.setState(
            produce(ctx.getState(), (state) => {
                const item = state.find((item) => item.label === action.label);
                if (item) {
                    item.status = 'FOUND';
                }
            })
        );
    }

    @Action(ShoppingItemBackToNeeded)
    itemBackToNeeded(ctx: StateContext<ShoppingItem[]>, action: ShoppingItemBackToNeeded) {
        ctx.setState(
            produce(ctx.getState(), (state) => {
                const item = state.find((item) => item.label === action.label);
                if (item) {
                    item.status = 'NEEDED';
                }
            })
        );
    }

    @Action(AddShoppingItem)
    addItem(ctx: StateContext<ShoppingItem[]>, action: AddShoppingItem) {
        ctx.setState(
            produce(ctx.getState(), (state) => {
                const item = state.find((item) => item.label === action.label);
                if (item) {
                    throw new Error(`"${action.label}" item already exist`);
                } else {
                    state.push({
                        label: action.label,
                        status: 'NEEDED',
                    });
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
                    }
                }
            })
        );
    }
}
