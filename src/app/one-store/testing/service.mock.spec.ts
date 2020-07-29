import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';

import { LoginResponse, OneStoreMetadata } from '../one-store.model';
import { OneStoreService, OneStoreInstanceInfo, OneStoreItem } from '../one-store.service';

@Injectable({
    providedIn: 'root',
})
export class OneStoreServiceMock implements Omit<OneStoreService, 'http'> {
    constructor() {}

    login(onestoreUrl: string, username: string, password: string): Observable<LoginResponse> {
        return EMPTY;
    }

    getMetadata(instance: OneStoreInstanceInfo, metadataId: string): Observable<OneStoreMetadata> {
        return EMPTY;
    }

    postMetadata(instance: OneStoreInstanceInfo, metadata: OneStoreMetadata): Observable<OneStoreMetadata> {
        return EMPTY;
    }

    getData<R>(instance: OneStoreInstanceInfo, dataContext: string): Observable<OneStoreItem<R>[]> {
        return EMPTY;
    }

    getOneData<R>(instance: OneStoreInstanceInfo, dataContext: string, dataId: string): Observable<OneStoreItem<R>> {
        return EMPTY;
    }

    createOneData<R>(instance: OneStoreInstanceInfo, dataContext: string, data: R): Observable<OneStoreItem<R>> {
        return EMPTY;
    }

    deleteOneData<R>(instance: OneStoreInstanceInfo, dataContext: string, dataId: string): Observable<OneStoreItem<R>> {
        return EMPTY;
    }
}

export function provideMockOneStore() {
    return { provide: OneStoreService, useClass: OneStoreServiceMock };
}
