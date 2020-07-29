import { Component } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store, Select } from '@ngxs/store';

import { ClearShoppingList } from '../store/shopping-list.actions';
import { Disconnect } from '../store/user.actions';
import { UserState } from '../store/user.state';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    @Select(UserState.isConnected) isUserConnected$: Observable<boolean>;

    constructor(private store: Store) {}

    clearCurrentList() {
        this.store.dispatch(new ClearShoppingList());
    }

    openSettings() {
        const currentUrl = this.store.selectSnapshot((state) => state.router.state.url);
        if (currentUrl === '/settings') {
            this.store.dispatch(new Navigate(['/']));
        } else {
            this.store.dispatch(new Navigate(['/settings']));
        }
    }

    logout() {
        this.store.dispatch(new Disconnect());
    }
}
