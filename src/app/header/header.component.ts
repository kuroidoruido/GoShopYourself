import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ClearShoppingList } from '../store/shopping-list.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    constructor(private store: Store) {}

    clearCurrentList() {
        this.store.dispatch(new ClearShoppingList());
    }
}
