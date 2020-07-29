import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SHA256 } from 'crypto-js';
import { Observable } from 'rxjs';

import { OneStoreModule } from './one-store.module';
import { LoginResponse, OneStoreMetadata } from './one-store.model';

export interface OneStoreInstanceInfo {
    onestoreUrl: string;
    username: string;
    token: string;
}

export interface OneStoreItem<T> {
    id: string;
    content: T;
}

@Injectable({
    providedIn: OneStoreModule,
})
export class OneStoreService {
    constructor(private http: HttpClient) {}

    login(onestoreUrl: string, username: string, password: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${onestoreUrl}/login`, {
            username,
            password: SHA256(password).toString(),
        });
    }

    getMetadata(instance: OneStoreInstanceInfo, metadataId: string): Observable<OneStoreMetadata> {
        return this.http.get<OneStoreMetadata>(`${instance.onestoreUrl}/metadata/${instance.username}/${metadataId}`, {
            headers: { Authorization: `Bearer ${instance.token}` },
        });
    }

    postMetadata(instance: OneStoreInstanceInfo, metadata: OneStoreMetadata): Observable<OneStoreMetadata> {
        return this.http.post<OneStoreMetadata>(`${instance.onestoreUrl}/metadata`, metadata, {
            headers: { Authorization: `Bearer ${instance.token}` },
        });
    }

    getData<R>(instance: OneStoreInstanceInfo, dataContext: string): Observable<OneStoreItem<R>[]> {
        return this.http.get<OneStoreItem<R>[]>(`${instance.onestoreUrl}/data/${instance.username}/${dataContext}`, {
            headers: { Authorization: `Bearer ${instance.token}` },
        });
    }

    getOneData<R>(instance: OneStoreInstanceInfo, dataContext: string, dataId: string): Observable<OneStoreItem<R>> {
        return this.http.get<OneStoreItem<R>>(
            `${instance.onestoreUrl}/data/${instance.username}/${dataContext}/${dataId}`,
            {
                headers: { Authorization: `Bearer ${instance.token}` },
            }
        );
    }

    createOneData<R>(instance: OneStoreInstanceInfo, dataContext: string, data: R): Observable<OneStoreItem<R>> {
        return this.http.post<OneStoreItem<R>>(
            `${instance.onestoreUrl}/data/${instance.username}/${dataContext}`,
            data,
            {
                headers: { Authorization: `Bearer ${instance.token}` },
            }
        );
    }

    deleteOneData<R>(instance: OneStoreInstanceInfo, dataContext: string, dataId: string): Observable<OneStoreItem<R>> {
        return this.http.delete<OneStoreItem<R>>(
            `${instance.onestoreUrl}/data/${instance.username}/${dataContext}/${dataId}`,
            {
                headers: { Authorization: `Bearer ${instance.token}` },
            }
        );
    }
}
