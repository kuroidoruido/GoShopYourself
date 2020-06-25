import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListViewComponent } from './shopping-list-view/shopping-list-view.component';
import { ShoppingListViewModule } from './shopping-list-view/shopping-list-view.module';

const routes: Routes = [{ path: '', component: ShoppingListViewComponent }];

@NgModule({
    imports: [RouterModule.forRoot(routes), ShoppingListViewModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}
