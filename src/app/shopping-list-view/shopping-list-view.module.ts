import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RemoveItemButtonModule } from 'src/app/shared/remove-item-button/remove-item-button.module';
import { AddToCurrentListButtonModule } from 'src/app/shared/add-to-current-list-button/add-to-current-list-button.module';

import { ShoppingListViewComponent } from './shopping-list-view.component';
import { CurrentListComponent } from './current-list/current-list.component';
import { OldListComponent } from './old-list/old-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { NewItemComponent } from './new-item/new-item.component';
import { ProgressChipModule } from '../shared/progress-chip/progress-chip.module';

@NgModule({
    declarations: [
        ShoppingListViewComponent,
        CurrentListComponent,
        OldListComponent,
        RecipeListComponent,
        NewItemComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatTabsModule,
        MatTooltipModule,

        RemoveItemButtonModule,
        AddToCurrentListButtonModule,
        ProgressChipModule,
    ],
})
export class ShoppingListViewModule {}
