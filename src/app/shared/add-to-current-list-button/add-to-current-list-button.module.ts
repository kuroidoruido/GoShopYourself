import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AddToCurrentListButtonComponent } from './add-to-current-list-button.component';

@NgModule({
    declarations: [AddToCurrentListButtonComponent],
    imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
    exports: [AddToCurrentListButtonComponent],
})
export class AddToCurrentListButtonModule {}
