import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ShoppingListState, ShoppingItem } from 'src/app/store/shopping-list.state';
import { RemoveShoppingItem, ShoppingItemBackToNeeded } from 'src/app/store/shopping-list.actions';

@Component({
    selector: 'app-old-list',
    templateUrl: './old-list.component.html',
    styleUrls: ['./old-list.component.scss'],
})
export class OldListComponent {
    @Select(ShoppingListState.oldItems) oldItems$: Observable<ShoppingItem[]>;

    constructor(private store: Store) {}

    addToCurrentList(item: ShoppingItem) {
        this.store.dispatch(new ShoppingItemBackToNeeded(item.label));
    }

    removeItem(item: ShoppingItem) {
        this.store.dispatch(new RemoveShoppingItem(item.label));
    }

    trackItems(item: ShoppingItem) {
        return item.label;
    }
}
