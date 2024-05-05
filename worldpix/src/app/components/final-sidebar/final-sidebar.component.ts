import { Component, HostListener} from '@angular/core';
import { SidebarComponent } from '../structure/sidebar/sidebar.component';
import { MobileSidebarComponent } from '../mobile-sidebar/mobile-sidebar.component';
import { CommonModule } from '@angular/common';
import { ResponsiveService } from '../../services/general/responsive-service.service';
@Component({
  selector: 'app-final-sidebar',
  standalone: true,
  imports: [SidebarComponent, MobileSidebarComponent, CommonModule],
  templateUrl: './final-sidebar.component.html',
  styleUrl: './final-sidebar.component.css'
})
export class FinalSidebarComponent {
  isLargeScreen: boolean = true; 

  constructor(private responsiveService: ResponsiveService) {
    console.log("HUH??")
    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });
    this.checkScreenSize();
  }

  //@HostListener('window:resize', ['$event'])

  checkScreenSize() {
    var dev = ResponsiveService.getDevice();
    console.log(dev);
    this.isLargeScreen = (dev === "desktop")
  }
}