import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IsLoggedInGuard } from './guard/is-logged-in.guard';
import { LoginPageComponent } from './login/login-page.component';
import { LoginPageModule } from './login/login-page.module';
import { SettingsComponent } from './settings/settings.component';
import { SettingsModule } from './settings/settings.module';
import { ShoppingListViewComponent } from './shopping-list-view/shopping-list-view.component';
import { ShoppingListViewModule } from './shopping-list-view/shopping-list-view.module';

const routes: Routes = [
    { path: '', component: ShoppingListViewComponent, pathMatch: 'full', canActivate: [IsLoggedInGuard] },
    { path: 'settings', component: SettingsComponent },
    { path: 'login', component: LoginPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes), LoginPageModule, SettingsModule, ShoppingListViewModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}
