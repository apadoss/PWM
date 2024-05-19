import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmPopupComponent } from "../../confirm-popup/confirm-popup.component";
import { CommonModule, NgIf } from '@angular/common';

@Component({
    selector: 'app-icon-round-toggle-button',
    standalone: true,
    templateUrl: './icon-round-toggle-button.component.html',
    styleUrl: './icon-round-toggle-button.component.css',
    imports: [ NgIf, CommonModule, ConfirmPopupComponent]
})
export class IconRoundToggleButtonComponent {
  @Input() linkOff: string = '';
  @Input() linkOn: string = '';
  @Input() state: boolean = false;
  @Input() confirm: boolean = false;
  @Output() buttonClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  confirming = false;

  constructor(){}
  ngOnInit(): void {
  }

  resolved(result: boolean) {
    this.confirming = false;
    this.buttonClick.emit(result);
  }

  click() {
    if (this.confirm) {
      this.confirming = true;
    } else {
      this.buttonClick.emit(true);
    }
  }
}
