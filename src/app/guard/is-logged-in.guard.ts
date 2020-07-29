import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { UserState } from '../store/user.state';
import { Navigate } from '@ngxs/router-plugin';

@Injectable({
    providedIn: 'root',
})
export class IsLoggedInGuard implements CanActivate {
    constructor(private store: Store) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.store.selectSnapshot(UserState.isOffline) || this.store.selectSnapshot(UserState.isConnected)) {
            return true;
        }
        this.store.dispatch(new Navigate(['/login']));
        return false;
    }
}
