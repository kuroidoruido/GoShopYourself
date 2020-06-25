import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

import { ProgressChipComponent } from './progress-chip.component';

@NgModule({
    declarations: [ProgressChipComponent],
    imports: [CommonModule, MatChipsModule],
    exports: [ProgressChipComponent],
})
export class ProgressChipModule {}
