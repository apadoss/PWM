import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-x-button',
  standalone: true,
  imports: [],
  templateUrl: './x-button.component.html',
  styleUrl: './x-button.component.css'
})
export class XButtonComponent {
  @Input() label: string = '';
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(){}
  ngOnInit(): void {
  }
  click() {
    this.buttonClick.emit();
  }
}
