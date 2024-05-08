import { Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common'; // Importa CommonModule

import { UserService } from './services/user.service';
import { AlbumService } from './services/album.service';
import { ImageService } from './services/image.service';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from './interfaces/user';
import { FooterComponent } from './components/structure/footer/footer.component';
import { HeaderComponent } from './components/structure/header/header.component';
import { TransparentButtonComponent } from './components/buttons/transparent-button/transparent-button.component';
import { GenericButtonComponent } from './components/buttons/generic-button/generic-button.component';
import { SidebarButtonComponent } from './components/buttons/sidebar-button/sidebar-button.component';
import { SidebarComponent } from './components/structure/sidebar/sidebar.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { Generic2ButtonComponent } from './components/buttons/generic2-button/generic2-button.component';
import { MobileSidebarComponent } from './components/mobile-sidebar/mobile-sidebar.component';
import { FinalSidebarComponent } from './components/final-sidebar/final-sidebar.component';
import { BodyComponent } from './components/structure/body/body.component';
import { HomeComponent } from './pages/home/home.component';
import { IndexComponent } from './pages/index/index.component';
import { ProfileComponent } from './pages/profile/profile.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None,
})

export class AppComponent {
  [x: string]: any;
  //title = 'worldpix';
  
  //constructor(private userService: UserService, private albumService: AlbumService, private imageService: ImageService, private router: Router) {}
}