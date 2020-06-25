import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ShoppingListState, ShoppingItem } from 'src/app/store/shopping-list.state';
import { ShoppingItemFound, ShoppingItemBackToNeeded, RemoveShoppingItem } from 'src/app/store/shopping-list.actions';

@Component({
    selector: 'app-current-list',
    templateUrl: './current-list.component.html',
    styleUrls: ['./current-list.component.scss'],
})
export class CurrentListComponent {
    @Select(ShoppingListState.currentListItems) neededItems$: Observable<ShoppingItem[]>;

    constructor(private store: Store) {}

    toggleItem(item: ShoppingItem) {
        if (item.status === 'NEEDED') {
            this.store.dispatch(new ShoppingItemFound(item.label));
        } else {
            this.store.dispatch(new ShoppingItemBackToNeeded(item.label));
        }
    }

    removeItem(item: ShoppingItem) {
        this.store.dispatch(new RemoveShoppingItem(item.label));
    }

    trackItems(item: ShoppingItem) {
        return item.label;
    }
}
