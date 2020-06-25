import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-remove-item-button',
    templateUrl: './remove-item-button.component.html',
    styleUrls: ['./remove-item-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveItemButtonComponent {
    @Output() iconClick = new EventEmitter<MouseEvent>();
}
