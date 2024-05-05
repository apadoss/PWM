import { Component, Input } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Image } from '../../interfaces/image';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-image-cascade',
    standalone: true,
    templateUrl: './image-cascade.component.html',
    styleUrl: './image-cascade.component.css',
    imports: [NgFor]
})
export class ImageCascadeComponent {
  constructor(private imageService: ImageService) {}
  
  images: Image[] = [];
  @Input() albumId: string = '';

  ngAfterViewInit() {
    this.loadImages();
  }

  loadImages() {
    this.imageService.getAlbumImages(this.albumId).then(
      (images) => (this.images = images)
    )
  }
}
