import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-generic-button',
  standalone: true,
  imports: [],
  templateUrl: './generic-button.component.html',
  styleUrl: './generic-button.component.css'
})
export class GenericButtonComponent implements OnInit{
  constructor(){}
  ngOnInit(): void {
  }
  clickAddTodo() {
    alert('hola 2!');
  }
}