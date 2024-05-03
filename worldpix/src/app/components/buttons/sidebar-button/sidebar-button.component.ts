import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-button',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-button.component.html',
  styleUrl: './sidebar-button.component.css'
})
export class SidebarButtonComponent implements OnInit{
  @Input() label: string = ' ';
  constructor(){}
  ngOnInit(): void {
  }
  clickAddTodo() {
    alert("button pressed");
  }
}