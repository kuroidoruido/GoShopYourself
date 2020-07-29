import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { first, switchMap, filter, catchError, map, flatMap } from 'rxjs/operators';

import { OneStoreService, OneStoreInstanceInfo } from 'src/app/one-store';
import { SettingsState, SettingsStateModel } from 'src/app/store/settings.state';
import { OneStoreMetadata } from './one-store/one-store.model';
import { Observable, from } from 'rxjs';
import { ShoppingItem } from './store/shopping-list.state';

const METADATA: Omit<OneStoreMetadata, 'owner'> = {
    dataContext: 'shopping-list',
    connectedUserRights: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
    anonymousUserRights: [],
};

@Injectable({
    providedIn: 'root',
})
export class OneStoreManagerService {
    constructor(private oneStore: OneStoreService, private ngxsStore: Store) {}

    login(password: string) {
        return this.ngxsStore.select(SettingsState).pipe(
            first(),
            filter(
                (settings: SettingsStateModel) =>
                    settings.onestoreUrl !== undefined &&
                    settings.onestoreUsername !== undefined &&
                    settings.onestoreShoppingListOwner !== undefined
            ),
            switchMap((settings: SettingsStateModel) =>
                this.oneStore.login(settings.onestoreUrl, settings.onestoreUsername, password)
            )
        );
    }

    ensureAccountConfigured(instance: OneStoreInstanceInfo): Observable<OneStoreMetadata> {
        return this.oneStore.getMetadata(instance, METADATA.dataContext).pipe(
            catchError(() => {
                console.log('No metadata found. Trying to create one');
                return this.oneStore.postMetadata(instance, { ...METADATA, owner: instance.username });
            })
        );
    }

    getShoppingList(instance: OneStoreInstanceInfo): Observable<ShoppingItem[]> {
        return this.oneStore
            .getData<ShoppingItem>(instance, METADATA.dataContext)
            .pipe(map((items) => items.map((item) => item.content)));
    }

    createOneShoppingItem(instance: OneStoreInstanceInfo, data: ShoppingItem): Observable<ShoppingItem> {
        return this.oneStore.createOneData(instance, METADATA.dataContext, data).pipe(map((item) => item.content));
    }

    updateOneShoppingItem(instance: OneStoreInstanceInfo, data: ShoppingItem): Observable<ShoppingItem> {
        return this.oneStore.getData<ShoppingItem>(instance, METADATA.dataContext).pipe(
            flatMap((items) => from(items)),
            filter((i) => i.content.label === data.label),
            first(),
            map((i) => i.id),
            flatMap((itemId) => this.deleteOneShoppingItemById(instance, itemId)),
            flatMap(() => this.createOneShoppingItem(instance, data))
        );
    }

    deleteOneShoppingItem(instance: OneStoreInstanceInfo, data: ShoppingItem): Observable<ShoppingItem> {
        return this.oneStore.getData<ShoppingItem>(instance, METADATA.dataContext).pipe(
            flatMap((items) => from(items)),
            filter((i) => i.content.label === data.label),
            first(),
            map((i) => i.id),
            flatMap((itemId) => this.deleteOneShoppingItemById(instance, itemId))
        );
    }

    deleteOneShoppingItemById(instance: OneStoreInstanceInfo, itemId: string): Observable<ShoppingItem> {
        return this.oneStore
            .deleteOneData<ShoppingItem>(instance, METADATA.dataContext, itemId)
            .pipe(map((item) => item.content));
    }
}
