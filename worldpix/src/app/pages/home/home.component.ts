import { Component } from '@angular/core';
import { GlobeComponent } from "./globe/globe.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [GlobeComponent]
})
export class HomeComponent {
  title = 'home';
}
