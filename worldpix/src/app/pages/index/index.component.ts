import { Component, EventEmitter, Output } from '@angular/core';
import { BodyComponent } from "../../components/structure/body/body.component";
import { HeaderComponent } from "../../components/structure/header/header.component";
import { FooterComponent } from "../../components/structure/footer/footer.component";
import { LoginFormComponent } from "../../components/login-form/login-form.component";
import { RegisterFormComponent } from "../../components/register-form/register-form.component";
import { CommonModule, NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AlbumService } from '../../services/album.service';

@Component({
    selector: 'app-index',
    standalone: true,
    templateUrl: './index.component.html',
    styleUrl: './index.component.css',
    imports: [BodyComponent, HeaderComponent, FooterComponent, LoginFormComponent, RegisterFormComponent,NgIf, CommonModule]
})
export class IndexComponent {
    //@Output() loggedIn: EventEmitter<any> = new EventEmitter();
    login_register = true;

    constructor(private userService: UserService, private router: Router, private albumManager: AlbumService) {
        if (UserService.currentUser !== "default") {
            this.router.navigateByUrl("home");
        }
    }

    async loggedIn(id: string) {
        UserService.currentUser = id;
        this.router.navigateByUrl("home");
      }
}
