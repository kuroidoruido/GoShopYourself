import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule, StorageOption } from '@ngxs/storage-plugin';

import { environment } from 'src/environments/environment';
import { ShoppingListState } from './shopping-list.state';
import { SettingsState } from './settings.state';
import { UserState } from './user.state';

@NgModule({
    imports: [
        NgxsModule.forRoot([ShoppingListState, SettingsState, UserState], {
            developmentMode: !environment.production,
        }),
        NgxsStoragePluginModule.forRoot({
            storage: StorageOption.LocalStorage,
            key: ['shoppingList', 'settings', 'user'],
        }),
        NgxsRouterPluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot({ name: 'GoShopYourself', disabled: environment.production, maxAge: 50 }),
    ],
})
export class AppStoreModule {}
