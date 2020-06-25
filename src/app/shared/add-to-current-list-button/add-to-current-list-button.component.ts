import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-add-to-current-list-button',
    templateUrl: './add-to-current-list-button.component.html',
    styleUrls: ['./add-to-current-list-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToCurrentListButtonComponent {
    @Output() iconClick = new EventEmitter<MouseEvent>();
}
