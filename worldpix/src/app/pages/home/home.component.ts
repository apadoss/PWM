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
import { randFloat } from 'three/src/math/MathUtils';
import { FinalSidebarComponent } from "../../components/final-sidebar/final-sidebar.component";
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    providers: [AlbumService, ImageService],
    imports: [GlobeComponent, BodyComponent, SidebarComponent, HeaderComponent, GenericButtonComponent, GenericButtonComponent, FinalSidebarComponent]
})

export class HomeComponent implements AfterViewInit {
  //@Input() userID: string = '';
  @ViewChild(GlobeComponent) globe: any;

  title = 'home';
  //albumManager = new AlbumManagerService;


  constructor(private userManager: UserService, private router: Router, private albumManager: AlbumService) {
    if (UserService.currentUser === "default") {
      window.alert("Error: not logged in");
      this.router.navigateByUrl("index");
    }
  }

  async ngAfterViewInit(): Promise<void> {
    //this.albumManager.generateAlbum(true, "Paris 24","01","01","18/04/2024","18/07/2024","Paris",[48.8566, 2.3522], "Description");
    //this.albumManager.generateAlbum(true, "Washington 24","01","02","18/04/2024","18/07/2024","Washington",[38.9072, -77.0369], "Description");
    //this.albumManager.generateAlbum(true, "Tokyo 24","01","03","18/04/2024","18/07/2024","Tokyo",[35.6764, 139.6500], "Description");
    let na = this.albumManager.generateAlbum(undefined, UserService.currentUser)
    this.albumManager.addAlbum(na)
    var albums = this.albumManager.getUserAlbums(UserService.currentUser);
    this.globe.renderAll(albums);
  }

  clicked(e: Event) {
    console.log(e)
    //this.removeAlbum("02");
    //this.addAlbum("Tokyo 24","01","03","18/04/2024","18/07/2024","Tokyo",[35.6764, 139.6500], "Description")
  }

  async hovered(e: string) {
    if (e !== null) {
      let thing = await this.albumManager.getAlbum(e);
      console.log("await done", await this.albumManager.getUserAlbums(UserService.currentUser));
      console.log("Currently previewing images of album: ", thing);
    } else {
      console.log("No longer previewing");
    }
  }

  newAlbum() {
    this.addAlbum("Random", UserService.currentUser, "test", "test", "test", "Random", [randFloat(-90,90), randFloat(-90,90)], "description")
  }

  async addAlbum(name: string, userID: string, albumID: string, datestart: string, dateend: string, cityname: string, coordinates: number[], description: string) {
    let newAlbum = this.albumManager.generateAlbum(name, userID, albumID, datestart, dateend, cityname, coordinates, description);
    let newAlbum2 = await this.albumManager.getAlbum(await this.albumManager.addAlbum(newAlbum))
    console.log(newAlbum2);
    this.globe.renderAlbum(newAlbum2);
  }

  removeAlbum(albumID: string) {
    let buffer = this.albumManager.getAlbum(albumID);
    if (!!buffer) {
      this.globe.deRenderAlbum(buffer);
      this.albumManager.deleteAlbum(albumID);
    }
  }
}
