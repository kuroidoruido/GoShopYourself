import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-progress-chip',
    templateUrl: './progress-chip.component.html',
    styleUrls: ['./progress-chip.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressChipComponent implements OnChanges {
    @Input() current = 0;
    @Input() total = 0;

    isEnded = false;

    ngOnChanges(changes: SimpleChanges) {
        if (changes.current && changes.total) {
            this.isEnded = changes.current.currentValue === changes.total.currentValue;
        } else {
            if (changes.current) {
                this.isEnded = changes.current.currentValue === this.total;
            }
            if (changes.total) {
                this.isEnded = this.current === changes.total.currentValue;
            }
        }
    }
}
