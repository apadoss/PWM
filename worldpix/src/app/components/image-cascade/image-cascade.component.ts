import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Image } from '../../interfaces/image';
import { NgFor } from '@angular/common';
import { IconRoundButtonComponent } from "../buttons/icon-round-button/icon-round-button.component";
import { ConfirmPopupComponent } from "../confirm-popup/confirm-popup.component";

@Component({
    selector: 'app-image-cascade',
    standalone: true,
    templateUrl: './image-cascade.component.html',
    styleUrl: './image-cascade.component.css',
    imports: [NgFor, IconRoundButtonComponent, ConfirmPopupComponent]
})
export class ImageCascadeComponent {
  constructor(private imageService: ImageService) {}
  
  images: Image[] = [];
  @Input() albumId: string = '';
  @Output() imageDeleted: EventEmitter<any> = new EventEmitter();


  ngAfterViewInit() {
    this.loadImages();
  }

  deleteImage(result: boolean, image: Image) {
    if (result) {
      this.imageService.deleteImage(image.id!);
      this.imageDeleted.emit()
    }
  }

  loadImages() {
    this.imageService.getAlbumImages(this.albumId).then(
      (images) => (this.images = images)
    )
  }
}
