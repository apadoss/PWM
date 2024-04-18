import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { GlobeComponent } from "./globe/globe.component";
//import { AlbumLoaderComponent } from "./album-loader/album-loader.component";
import { AlbumManagerService } from '../../services/home/AlbumManager/album-manager.service';
import { ImageManagerService } from '../../services/home/ImageManager/image-manager.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [GlobeComponent],
    providers: [AlbumManagerService, ImageManagerService]
})
export class HomeComponent implements AfterViewInit {
  @ViewChild(GlobeComponent) globe: any;

  title = 'home';

  constructor() {
  }

  ngAfterViewInit(): void {
    let albumManager = new AlbumManagerService;
    console.log(albumManager.getAlbums());
    this.globe.renderAll(albumManager);
  }
}
