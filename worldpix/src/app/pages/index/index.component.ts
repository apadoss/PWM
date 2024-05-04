import { Component } from '@angular/core';
import { BodyComponent } from "../../components/structure/body/body.component";
import { HeaderComponent } from "../../components/structure/header/header.component";
import { FooterComponent } from "../../components/structure/footer/footer.component";
import { LoginFormComponent } from "../../components/login-form/login-form.component";

@Component({
    selector: 'app-index',
    standalone: true,
    templateUrl: './index.component.html',
    styleUrl: './index.component.css',
    imports: [BodyComponent, HeaderComponent, FooterComponent, LoginFormComponent]
})
export class IndexComponent {

}
