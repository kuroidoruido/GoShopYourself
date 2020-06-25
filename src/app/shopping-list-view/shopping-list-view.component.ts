import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ShoppingListState, CurrentListItemCount } from '../store/shopping-list.state';

@Component({
    selector: 'app-shopping-list-view',
    templateUrl: './shopping-list-view.component.html',
    styleUrls: ['./shopping-list-view.component.scss'],
})
export class ShoppingListViewComponent {
    @Select(ShoppingListState.currentListItemCount) currentListItemCount$: Observable<CurrentListItemCount>;

    handsetLayout$: Observable<boolean>;

    constructor(breakpointObserver: BreakpointObserver) {
        this.handsetLayout$ = breakpointObserver
            .observe([Breakpoints.Handset, Breakpoints.HandsetLandscape, Breakpoints.HandsetLandscape])
            .pipe(map((result) => Boolean(result.matches)));
    }
}
