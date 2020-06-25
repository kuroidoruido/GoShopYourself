import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule, StorageOption } from '@ngxs/storage-plugin';

import { environment } from 'src/environments/environment';
import { ShoppingListState } from './shopping-list.state';

@NgModule({
    imports: [
        NgxsModule.forRoot([ShoppingListState], {
            developmentMode: !environment.production,
        }),
        NgxsStoragePluginModule.forRoot({
            storage: StorageOption.LocalStorage,
        }),
        NgxsReduxDevtoolsPluginModule.forRoot({ name: 'GoShopYourself', disabled: environment.production, maxAge: 50 }),
    ],
})
export class AppStoreModule {}
