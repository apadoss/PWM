import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BodyComponent } from "../structure/body/body.component";
import { Album } from '../../interfaces/album';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { AlbumService } from '../../services/album.service';
import { Generic2ButtonComponent } from "../buttons/generic2-button/generic2-button.component";
import { IconRoundButtonComponent } from "../buttons/icon-round-button/icon-round-button.component";
import { ConfirmPopupComponent } from "../confirm-popup/confirm-popup.component";

@Component({
    selector: 'app-album-card',
    standalone: true,
    templateUrl: './album-card.component.html',
    styleUrl: './album-card.component.css',
    imports: [BodyComponent, NgIf, CommonModule, Generic2ButtonComponent, IconRoundButtonComponent, ConfirmPopupComponent]
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

  album: Album = {
    name: '',
    description: '',
    dateStart: '',
    dateEnd: '',
    cityName: '',
    coordinates: [],
    userId: ''
  };

  constructor(private router: Router, private albumManager: AlbumService, private route: ActivatedRoute) {}

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

  deleteAlbum() {

  }

  onMouseMove(event: Event) {
    event.stopPropagation();
  }
}
