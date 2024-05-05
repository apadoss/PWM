import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BodyComponent } from "../structure/body/body.component";
import { Album } from '../../interfaces/album';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { AlbumService } from '../../services/album.service';
import { Generic2ButtonComponent } from "../buttons/generic2-button/generic2-button.component";
import { IconRoundButtonComponent } from "../buttons/icon-round-button/icon-round-button.component";
import { ConfirmPopupComponent } from "../confirm-popup/confirm-popup.component";
import { EventService } from '@app/services/general/event-service.service';
import { ImageCascadeComponent } from "../image-cascade/image-cascade.component";

@Component({
    selector: 'app-album-card',
    standalone: true,
    templateUrl: './album-card.component.html',
    styleUrl: './album-card.component.css',
    imports: [BodyComponent, NgIf, CommonModule, Generic2ButtonComponent, IconRoundButtonComponent, ConfirmPopupComponent, ImageCascadeComponent]
})
export class AlbumCardComponent {
  /*@Input() album: Album = {
    name: '',
    description: '',
    dateStart: '',
    dateEnd: '',
    cityName: '',
    coordinates: [],
    userId: ''
  };*/

  @Output() albumDeleted: EventEmitter<any> = new EventEmitter();
  deleting = false;
  uploading = false;

  album: Album = {
    name: '',
    id: '',
    description: '',
    dateStart: '',
    dateEnd: '',
    cityName: '',
    coordinates: [],
    userId: ''
  };

  constructor(private router: Router, private albumManager: AlbumService, private eventManager: EventService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      // Get the value of the albumId parameter from the route
      var id = params.get('albumId');
      if (!!id) {
        this.album = <Album> await this.albumManager.getAlbum(id);
      } else {
        console.error("Album could not be retrieved")
      }
    });
  }

  return() {
    this.router.navigateByUrl('home');
  }

  resolveDelete(result: boolean) {
    console.log("deleting")
    this.deleting = false;
    if (result && this.album.id) {
      this.eventManager.albumDeleted(this.album.id);
      this.return();
      //this.router.navigate(['home', this.album.id, "deleting"])
    }
  }

  onMouseMove(event: Event) {
    event.stopPropagation();
  }
}
