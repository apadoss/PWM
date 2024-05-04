import { Component } from '@angular/core';
import { SidebarButtonComponent } from '../../buttons/sidebar-button/sidebar-button.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  activeButton: string = 'home';

  setActiveButton(button: string): void {
    this.activeButton = button;
  }
}