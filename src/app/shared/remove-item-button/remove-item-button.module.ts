import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RemoveItemButtonComponent } from './remove-item-button.component';

@NgModule({
    declarations: [RemoveItemButtonComponent],
    imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
    exports: [RemoveItemButtonComponent],
})
export class RemoveItemButtonModule {}
