import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { GlobeComponent } from "./globe/globe.component";
//import { AlbumLoaderComponent } from "./album-loader/album-loader.component";
import { BodyComponent } from "../../components/structure/body/body.component";
import { SidebarComponent } from '../../components/structure/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/structure/header/header.component';
import { GenericButtonComponent } from "../../components/buttons/generic-button/generic-button.component";
import { AlbumService } from '../../services/album.service';
import { AlbumResponse } from '../../interfaces/albumresponse';
import { ImageService } from '../../services/image.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    providers: [AlbumService, ImageService],
    imports: [GlobeComponent, BodyComponent, SidebarComponent, HeaderComponent, GenericButtonComponent, GenericButtonComponent]
})

export class HomeComponent implements AfterViewInit {
  @Input() userID: string = '';
  @ViewChild(GlobeComponent) globe: any;

  title = 'home';
  //albumManager = new AlbumManagerService;


  constructor(private albumManager: AlbumService) {
  }

  ngAfterViewInit(): void {
    //this.albumManager.generateAlbum(true, "Paris 24","01","01","18/04/2024","18/07/2024","Paris",[48.8566, 2.3522], "Description");
    //this.albumManager.generateAlbum(true, "Washington 24","01","02","18/04/2024","18/07/2024","Washington",[38.9072, -77.0369], "Description");
    //this.albumManager.generateAlbum(true, "Tokyo 24","01","03","18/04/2024","18/07/2024","Tokyo",[35.6764, 139.6500], "Description");
    let na = this.albumManager.generateAlbum(undefined, this.userID)
    this.albumManager.addAlbum(na)
    var albums = this.albumManager.getUserAlbums(this.userID);
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
    let newAlbum = this.albumManager.generateAlbum(name, userID, albumID, datestart, dateend, cityname, coordinates, description);
    this.albumManager.addAlbum(newAlbum);
    this.globe.renderAlbum(newAlbum)
  }

  removeAlbum(albumID: string) {
    let buffer = this.albumManager.getAlbum(albumID);
    if (!!buffer) {
      this.globe.deRenderAlbum(buffer);
      this.albumManager.deleteAlbum(albumID);
    }
  }
}
