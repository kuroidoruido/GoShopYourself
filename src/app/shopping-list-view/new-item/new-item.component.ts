import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';

import { AddShoppingItem } from 'src/app/store/shopping-list.actions';

@Component({
    selector: 'app-new-item',
    templateUrl: './new-item.component.html',
    styleUrls: ['./new-item.component.scss'],
})
export class NewItemComponent implements OnInit, OnDestroy {
    form = new FormGroup({
        label: new FormControl(''),
    });
    private valueChanges$: Subscription;

    constructor(private store: Store) {}

    ngOnInit() {
        this.valueChanges$ = this.form.valueChanges.subscribe(() => this.form.controls.label.setErrors(null));
    }

    ngOnDestroy() {
        if (this.valueChanges$) {
            this.valueChanges$.unsubscribe();
        }
    }

    onSubmit() {
        const label = this.form.value.label;
        this.store.dispatch(new AddShoppingItem(label)).subscribe(
            () => this.form.reset(),
            (error) => this.form.controls.label.setErrors({ saved: error })
        );
    }
}
