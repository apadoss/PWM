import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon-round-button',
  standalone: true,
  imports: [],
  templateUrl: './icon-round-button.component.html',
  styleUrl: './icon-round-button.component.css'
})
export class IconRoundButtonComponent {
  @Input() link: string = '';
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(){}
  ngOnInit(): void {
  }
  click() {
    this.buttonClick.emit();
  }
}
