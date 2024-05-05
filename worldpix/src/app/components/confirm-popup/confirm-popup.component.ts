import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-popup',
  standalone: true,
  imports: [],
  templateUrl: './confirm-popup.component.html',
  styleUrl: './confirm-popup.component.css'
})
export class ConfirmPopupComponent {
  @Input() question: string = 'Are you sure?';
  @Input() confirm: string = 'Yes';
  @Input() cancel: string = 'No';
  @Output() result: EventEmitter<any> = new EventEmitter();
}
