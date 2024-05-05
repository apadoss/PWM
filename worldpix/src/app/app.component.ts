import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TransparentButtonComponent, 
    GenericButtonComponent, SidebarButtonComponent, 
    SidebarComponent, LoginFormComponent, 
    Generic2ButtonComponent, MobileSidebarComponent,
    FinalSidebarComponent, CommonModule, NgIf, BodyComponent, HomeComponent, IndexComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'worldpix';
  currentUserId: string = '';
  currentPage = "index";
  
  constructor (private userService: UserService, private albumService: AlbumService, private imageService: ImageService) {}

  loggedIn(id: string) {
    this.currentUserId = id;
    this.currentPage = "home";
  }

}
