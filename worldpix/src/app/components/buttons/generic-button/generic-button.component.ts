import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-generic-button',
  standalone: true,
  imports: [],
  templateUrl: './generic-button.component.html',
  styleUrl: './generic-button.component.css'
})
export class GenericButtonComponent implements OnInit{
  @Input() label: string = ' ';
  @Output() clicked: EventEmitter<any> = new EventEmitter();
  constructor(){}
  ngOnInit(): void {
  }
}