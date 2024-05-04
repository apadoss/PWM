import { Component } from '@angular/core';
import { BodyComponent } from "../../components/structure/body/body.component";
import { HeaderComponent } from "../../components/structure/header/header.component";
import { FooterComponent } from "../../components/structure/footer/footer.component";
import { LoginFormComponent } from "../../components/login-form/login-form.component";
import { RegisterFormComponent } from "../../components/register-form/register-form.component";
import { CommonModule, NgIf } from '@angular/common';

@Component({
    selector: 'app-index',
    standalone: true,
    templateUrl: './index.component.html',
    styleUrl: './index.component.css',
    imports: [BodyComponent, HeaderComponent, FooterComponent, LoginFormComponent, RegisterFormComponent,NgIf, CommonModule]
})
export class IndexComponent {
    login_register = true;
}