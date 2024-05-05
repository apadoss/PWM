import { Component, HostListener} from '@angular/core';
import { SidebarComponent } from '../structure/sidebar/sidebar.component';
import { MobileSidebarComponent } from '../mobile-sidebar/mobile-sidebar.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-final-sidebar',
  standalone: true,
  imports: [SidebarComponent, MobileSidebarComponent, CommonModule],
  templateUrl: './final-sidebar.component.html',
  styleUrl: './final-sidebar.component.css'
})
export class FinalSidebarComponent {
  isLargeScreen: boolean = true; 

  constructor() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  checkScreenSize() {
    this.isLargeScreen = window.innerWidth > 730; 
  }
}