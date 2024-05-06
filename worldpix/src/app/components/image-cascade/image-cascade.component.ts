import { Component, Input } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Image } from '../../interfaces/image';
import { NgFor } from '@angular/common';
import { IconRoundButtonComponent } from "../buttons/icon-round-button/icon-round-button.component";

@Component({
    selector: 'app-image-cascade',
    standalone: true,
    templateUrl: './image-cascade.component.html',
    styleUrl: './image-cascade.component.css',
    imports: [NgFor, IconRoundButtonComponent]
})
export class ImageCascadeComponent {
  constructor(private imageService: ImageService) {}
  
  images: Image[] = [];
  @Input() albumId: string = '';

  ngAfterViewInit() {
    this.loadImages();
  }

  deleteImage(image: Image) {
    this.imageService.deleteImage(image.id!);
  }

  loadImages() {
    this.imageService.getAlbumImages(this.albumId).then(
      (images) => (this.images = images)
    )
  }
}
