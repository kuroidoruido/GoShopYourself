import { Injectable } from '@angular/core';

import { OneStoreMetadata } from './one-store/one-store.model';
import { Observable, EMPTY } from 'rxjs';
import { ShoppingItem } from './store/shopping-list.state';
import { OneStoreManagerService } from './one-store-manager.service';

@Injectable({ providedIn: 'root' })
export class OneStoreManagerServiceMock {
    constructor() {}

    login() {
        return EMPTY;
    }

    ensureAccountConfigured(): Observable<OneStoreMetadata> {
        return EMPTY;
    }

    getShoppingList(): Observable<ShoppingItem[]> {
        return EMPTY;
    }

    createOneShoppingItem(): Observable<ShoppingItem> {
        return EMPTY;
    }

    updateOneShoppingItem(): Observable<ShoppingItem> {
        return EMPTY;
    }

    deleteOneShoppingItem(): Observable<ShoppingItem> {
        return EMPTY;
    }

    deleteOneShoppingItemById(): Observable<ShoppingItem> {
        return EMPTY;
    }
}

export function provideOneStoreManagerService() {
    return { provide: OneStoreManagerService, useClass: OneStoreManagerServiceMock };
}
