import { Component, ViewChild, AfterViewInit, Input, ViewEncapsulation } from '@angular/core';
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
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AlbumCardComponent } from "../../components/album-card/album-card.component";
import { Album } from '../../interfaces/album';
import { CommonModule, NgIf } from '@angular/common';
import { EventService } from '@app/services/general/event-service.service';
import { Subscription } from 'rxjs';
import { AlbumPreviewComponent } from "../../components/album-preview/album-preview.component";
import { CreateAlbumComponent } from "../../components/create-album/create-album.component";
import { ResponsiveService } from '@app/services/general/responsive-service.service';
import { ProgressBarComponent } from "../../components/progress-bar/progress-bar.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerComponent } from "../../components/spinner/spinner.component";


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    providers: [AlbumService, ImageService],
    encapsulation: ViewEncapsulation.None,
    imports: [MatProgressSpinnerModule, NgIf, CommonModule, RouterOutlet, GlobeComponent, BodyComponent, SidebarComponent, HeaderComponent, GenericButtonComponent, GenericButtonComponent, FinalSidebarComponent, AlbumCardComponent, AlbumPreviewComponent, CreateAlbumComponent, ProgressBarComponent, SpinnerComponent]
})

export class HomeComponent implements AfterViewInit {
  //@Input() userID: string = '';
  @ViewChild(GlobeComponent) globe: any;

  title = 'home';
  displayedAlbum: string = '';
  hoveredAlbum: string = '';
  creating: boolean = false;
  private albumDeletedSubscription: Subscription = new Subscription;
  //albumManager = new AlbumManagerService;


  constructor(private userManager: UserService, private eventManager: EventService, private router: Router, private route: ActivatedRoute, private albumManager: AlbumService, private responsiveManager: ResponsiveService) {
    if (UserService.currentUser === "default") {
      //RESTORE FOR BETTER UX, DISABLED FOR DEV
      //window.alert("Error: not logged in");
      this.router.navigateByUrl("index");
    } else {
      this.albumDeletedSubscription = this.eventManager.albumDeleted$.subscribe((deleted) => {
        // Handle the emitted albumDeleted event
        if (deleted) {
          this.removeAlbum(deleted);
        }
      });
    }
  }

  state() {
    return ResponsiveService.getDevice();
  }

  async testAlbum() {
    //let thing = await this.albumManager.getAlbum("jQqinzYcBLIF31aL2Ffk");
    this.router.navigate(['home', "jQqinzYcBLIF31aL2Ffk"])
    //this.displayedAlbum = <Album> await thing;
  }

  async ngAfterViewInit(): Promise<void> {
    //this.albumManager.generateAlbum(true, "Paris 24","01","01","18/04/2024","18/07/2024","Paris",[48.8566, 2.3522], "Description");
    //this.albumManager.generateAlbum(true, "Washington 24","01","02","18/04/2024","18/07/2024","Washington",[38.9072, -77.0369], "Description");
    //this.albumManager.generateAlbum(true, "Tokyo 24","01","03","18/04/2024","18/07/2024","Tokyo",[35.6764, 139.6500], "Description");
    var albums = this.albumManager.getUserAlbums(UserService.currentUser);
    this.globe.renderAll(albums);
  }

  clicked(e: Event) {
    this.hoveredAlbum = '';
    this.router.navigate(['/home', e]);
    /*
        this.route.paramMap.subscribe(params => {
      this.imageId = params.get('imageId');
      // Now you have access to the imageId parameter
    });
    */
    //this.removeAlbum("02");
    //this.addAlbum("Tokyo 24","01","03","18/04/2024","18/07/2024","Tokyo",[35.6764, 139.6500], "Description")
  }

  async hovered(e: string) {
    this.hoveredAlbum = '';
    if (!!e) {
      this.hoveredAlbum = '-1';
      setTimeout(()=>{
        if (this.hoveredAlbum === '-1') {
          this.hoveredAlbum = e;
        } else {
          this.hoveredAlbum = '';
        }
      }, 500);
    }
  }

  newAlbum() {
    //this.addAlbum("Random", UserService.currentUser, "test", "test", "test", "Random", [randFloat(-90,90), randFloat(-90,90)], "description")
  }

  async addAlbum2(name: string, userID: string, albumID: string, datestart: string, dateend: string, cityname: string, coordinates: number[], description: string) {
    let newAlbum = this.albumManager.generateAlbum(name, userID, albumID, datestart, dateend, cityname, coordinates, description);
    let newID = await this.albumManager.addAlbum(newAlbum);
    let newAlbum2 = await this.albumManager.getAlbum(newID);
    this.globe.renderAlbum(await newAlbum2);
  }

  async addAlbum(album: Album) {
    this.creating = false;
    let buffer = album;
    let newID = await this.albumManager.addAlbum(buffer);
    let newAlbum2 = await this.albumManager.getAlbum(newID);
    newAlbum2!['id'] = newID;
    this.globe.renderAlbum(newAlbum2);
  }

  async removeAlbum(albumID: string) {
    let buffer = await this.albumManager.getAlbum(albumID);
    if (!!buffer) {
      this.globe.deRenderAlbum(buffer);
      this.albumManager.deleteAlbum(albumID);
    }
  }
}
