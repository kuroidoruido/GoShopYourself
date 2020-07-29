import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ShoppingListState, CurrentListItemCount } from 'src/app/store/shopping-list.state';

@Component({
    selector: 'app-shopping-list-view',
    templateUrl: './shopping-list-view.component.html',
    styleUrls: ['./shopping-list-view.component.scss'],
})
export class ShoppingListViewComponent {
    @Select(ShoppingListState.currentListItemCount) currentListItemCount$: Observable<CurrentListItemCount>;

    handsetLayout$: Observable<boolean>;

    constructor(breakpointObserver: BreakpointObserver, store: Store) {
        this.handsetLayout$ = breakpointObserver
            .observe([Breakpoints.Handset, Breakpoints.HandsetLandscape, Breakpoints.HandsetLandscape])
            .pipe(map((result) => Boolean(result.matches)));
    }
}
