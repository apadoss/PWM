import { Component } from '@angular/core';
import { GlobeComponent } from "./globe/globe.component";
import { AlbumLoaderComponent } from "./album-loader/album-loader.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [GlobeComponent, AlbumLoaderComponent]
})
export class HomeComponent {
  title = 'home';
}
