import { Component, Output, Input, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-sidebar-button',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-button.component.html',
  styleUrl: './sidebar-button.component.css'
})
export class SidebarButtonComponent {
  @Input() label: string = ' ';
  @Input() active: boolean = false;
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  clickAddTodo(): void{
    this.buttonClick.emit();
  }
}