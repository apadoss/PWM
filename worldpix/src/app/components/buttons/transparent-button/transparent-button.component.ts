import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transparent-button',
  standalone: true,
  imports: [],
  templateUrl: './transparent-button.component.html',
  styleUrl: './transparent-button.component.css'
})
export class TransparentButtonComponent implements OnInit{
  constructor(){}
  ngOnInit(): void {
  }
  clickAddTodo() {
    alert('hola!');
  }
}
  
  
  
