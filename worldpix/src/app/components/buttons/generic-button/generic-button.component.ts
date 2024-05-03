import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-generic-button',
  standalone: true,
  imports: [],
  templateUrl: './generic-button.component.html',
  styleUrl: './generic-button.component.css'
})
export class GenericButtonComponent implements OnInit{
  @Input() label: string = ' ';
  constructor(){}
  ngOnInit(): void {
  }
  clickAddTodo() {
    alert('button pressed');
  }
}