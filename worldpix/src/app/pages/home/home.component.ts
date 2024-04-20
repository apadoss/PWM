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
  albumManager = new AlbumManagerService;


  constructor() {
  }

  ngAfterViewInit(): void {
    this.albumManager.generateAlbum(true, "Paris 24","01","01","18/04/2024","18/07/2024","Paris",[48.8566, 2.3522], "Description");
    this.albumManager.generateAlbum(true, "Washington 24","01","02","18/04/2024","18/07/2024","Washington",[38.9072, -77.0369], "Description");
    this.albumManager.generateAlbum(true, "Tokyo 24","01","03","18/04/2024","18/07/2024","Tokyo",[35.6764, 139.6500], "Description");
    this.globe.renderAll(this.albumManager);
  }

  clicked(e: Event) {
    console.log(e)
    //this.removeAlbum("02");
    //this.addAlbum("Tokyo 24","01","03","18/04/2024","18/07/2024","Tokyo",[35.6764, 139.6500], "Description")
  }

  hovered(e: string) {
    if (e !== null) {
      console.log("Currently previewing images of album: ", this.albumManager.getAlbum(e));
    } else {
      console.log("No longer previewing");
    }
  }

  addAlbum(name: string, userID: string, albumID: string, datestart: string, dateend: string, cityname: string, coordinates: number[], description: string) {
    let buffer = this.albumManager.generateAlbum(true, name, userID, albumID, datestart, dateend, cityname, coordinates, description);
    if (!buffer[1]) {
      //Manage already existing album ID
      //If proceed, this.albumManager.addAlbum(buffer, true);
      //Else, discard AND RETURN
      console.log("Already exists", this.albumManager.getAlbums())
      return;
    }
    this.globe.renderAlbum(buffer[0])
  }

  removeAlbum(albumID: string) {
    let buffer = this.albumManager.getAlbum(albumID);
    if (!!buffer) {
      this.globe.deRenderAlbum(buffer);
      this.albumManager.removeAlbum(albumID);
    }
  }
}
