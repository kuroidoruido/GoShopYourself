import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { SettingsState } from '../store/settings.state';
import { TryLogIn } from '../store/user.actions';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnDestroy {
    form = new FormGroup({
        onestoreUrl: new FormControl(''),
        username: new FormControl(''),
        password: new FormControl(''),
    });

    private settingsSub$: Subscription;

    constructor(private store: Store) {
        this.settingsSub$ = this.store.select(SettingsState).subscribe((settings) => {
            if (settings) {
                this.form.patchValue({
                    onestoreUrl: settings.onestoreUrl,
                    username: settings.onestoreUsername,
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
        this.store.dispatch(new TryLogIn(this.form.value.password));
    }
}
