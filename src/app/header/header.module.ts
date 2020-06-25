import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HeaderComponent } from './header.component';

@NgModule({
    declarations: [HeaderComponent],
    imports: [CommonModule, MatButtonModule, MatIconModule, MatToolbarModule, MatTooltipModule],
    exports: [HeaderComponent],
})
export class HeaderModule {}
