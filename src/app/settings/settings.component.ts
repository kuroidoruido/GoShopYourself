import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';

import { SettingsState } from '../store/settings.state';
import { PatchSettings } from '../store/settings.actions';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnDestroy {
    form = new FormGroup({
        onestoreUrl: new FormControl('', Validators.pattern(/^https?:\/\/.+$/)),
        onestoreUsername: new FormControl(''),
        onestoreShoppingListOwner: new FormControl(''),
    });

    private settingsSub$: Subscription;

    constructor(private store: Store) {
        this.settingsSub$ = this.store.select(SettingsState).subscribe((settings) => {
            if (settings) {
                this.form.patchValue({
                    onestoreUrl: settings.onestoreUrl,
                    onestoreUsername: settings.onestoreUsername,
                    onestoreShoppingListOwner: settings.onestoreShoppingListOwner,
                });
            }
        });
    }

    ngOnDestroy(): void {
        if (this.settingsSub$) {
            this.settingsSub$.unsubscribe();
        }
    }

    onSubmit() {
        this.store.dispatch(
            new PatchSettings({
                onestoreUrl: this.form.value.onestoreUrl,
                onestoreUsername: this.form.value.onestoreUsername,
                onestoreShoppingListOwner: this.form.value.onestoreShoppingListOwner,
            })
        );
    }
}
