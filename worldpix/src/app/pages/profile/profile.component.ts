import { Component } from '@angular/core';
import { SidebarComponent } from '@app/components/structure/sidebar/sidebar.component';
import { HeaderComponent } from '@app/components/structure/header/header.component';
import { BodyComponent } from '@app/components/structure/body/body.component';
import { Router, RouterOutlet } from '@angular/router';
import { FinalSidebarComponent } from '@app/components/final-sidebar/final-sidebar.component';
import { ImageCascadeComponent } from '@app/components/image-cascade/image-cascade.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ SidebarComponent, HeaderComponent, BodyComponent, FinalSidebarComponent, RouterOutlet, ImageCascadeComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
