import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-button',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-button.component.html',
  styleUrl: './sidebar-button.component.css'
})
export class SidebarButtonComponent implements OnInit{
  constructor(){}
  ngOnInit(): void {
  }
  clickAddTodo() {
  }
}