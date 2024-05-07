import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-generic2-button',
  standalone: true,
  imports: [],
  templateUrl: './generic2-button.component.html',
  styleUrl: './generic2-button.component.css'
})
export class Generic2ButtonComponent implements OnInit{
  @Input() label: string = '';
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(){}
  ngOnInit(): void {
  }
  click() {
    this.buttonClick.emit();
  }
}