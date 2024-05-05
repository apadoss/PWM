import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Generic2ButtonComponent } from "../buttons/generic2-button/generic2-button.component";

@Component({
    selector: 'app-confirm-popup',
    standalone: true,
    templateUrl: './confirm-popup.component.html',
    styleUrl: './confirm-popup.component.css',
    imports: [Generic2ButtonComponent]
})
export class ConfirmPopupComponent {
  @Input() question: string = 'Are you sure?';
  @Input() confirm: string = 'Yes';
  @Input() cancel: string = 'No';
  @Output() result: EventEmitter<any> = new EventEmitter();
}
