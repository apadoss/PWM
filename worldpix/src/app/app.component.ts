import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
import { HomeComponent } from "./pages/home/home.component";
import { BodyComponent } from "./components/structure/body/body.component";
import { IndexComponent } from "./pages/index/index.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, FormsModule, FooterComponent, SidebarComponent, HeaderComponent, LoginFormComponent, BodyComponent, HomeComponent, IndexComponent]
})
export class AppComponent {
  title = 'worldpix';

  user: User = {email: '', username: '', password: ''}
  currentUserId: string = 'acuqsbqqFs1GDjY32SiW';
  constructor (private userService: UserService, private albumService: AlbumService, private imageService: ImageService) {}

  uploadTest() {
    const url = this.imageService.uploadImage();
    console.log(url);
  }

  createUser(form: NgForm) {
    this.userService.addUser(form.value)
    .then((docRef: { id: string; }) => this.currentUserId = docRef.id)
    .then(() => form.reset());
  }

  getUser() {
    this.userService.getUser(this.currentUserId).subscribe(res => {
      this.user = res;
    });
    console.log(this.user);
  }

  deleteUser() {
    this.userService.deleteUser(this.currentUserId);
  }

  updateUser(form: NgForm) {
    console.log(form.value.newEmail);
    this.userService.modifyUserEmail(this.currentUserId, form.value.newEmail)
    .then(() => form.reset());
  }

  getAlbums() {
    console.log(this.albumService.getUserAlbums(this.currentUserId));
  }
}
