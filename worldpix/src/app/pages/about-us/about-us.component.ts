import { Component } from '@angular/core';
import { BodyComponent } from "../../components/structure/body/body.component";
import { HeaderComponent } from "../../components/structure/header/header.component";
import { FooterComponent } from "../../components/structure/footer/footer.component";

@Component({
    selector: 'app-about-us',
    standalone: true,
    templateUrl: './about-us.component.html',
    styleUrl: './about-us.component.css',
    imports: [BodyComponent, HeaderComponent, FooterComponent]
})
export class AboutUsComponent {

}
