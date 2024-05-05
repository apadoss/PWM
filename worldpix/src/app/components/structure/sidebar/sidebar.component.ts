import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SidebarButtonComponent } from '../../buttons/sidebar-button/sidebar-button.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() activeTab: string = "home";
  @Output() clickTab: EventEmitter<any> = new EventEmitter();
}