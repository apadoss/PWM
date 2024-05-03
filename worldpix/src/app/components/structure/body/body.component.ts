import { Component, ContentChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {
  @ContentChild(HeaderComponent, { static: false }) header: HeaderComponent | undefined;
  @ContentChild(SidebarComponent, { static: false }) sidebar: SidebarComponent | undefined;
  @ContentChild(FooterComponent, { static: false }) footer: FooterComponent | undefined;
  //@ViewChild('app-header', { static: true }) sidebarTemplateRef: TemplateRef<any>;

  ngAfterViewInit() {
    console.log(this.header);
  }

}
