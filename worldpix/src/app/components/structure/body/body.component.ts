import { Component, ContentChild, HostListener } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule, NgIf } from '@angular/common';
import { ResponsiveService } from '../../../services/general/responsive-service.service';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {
  context: String = "mobile";

  @ContentChild(HeaderComponent, { static: false }) header: HeaderComponent | undefined;
  @ContentChild(SidebarComponent, { static: false }) sidebar: SidebarComponent | undefined;
  @ContentChild(FooterComponent, { static: false }) footer: FooterComponent | undefined;
  //@ViewChild('app-header', { static: true }) sidebarTemplateRef: TemplateRef<any>;

  //Note: may cause issues with slow components? Check with home
  ngAfterContentInit() {
    window.addEventListener('resize', this.updateDevice);
    this.updateDevice();

    //this.context = ResponsiveService.getDevice();

    if (this.header !== undefined) {

    }
    if (this.sidebar !== undefined) {

    }
    if (this.footer !== undefined) {

    }
  }

  updateDevice() {
    this.context = ResponsiveService.getDevice();
  }

}
