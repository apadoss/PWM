import { Component, Input } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Image } from '../../interfaces/image';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-image-cascade',
  standalone: true,
  imports: [NgFor],
  templateUrl: './image-cascade.component.html',
  styleUrl: './image-cascade.component.css'
})
export class ImageCascadeComponent {
  constructor(private imageService: ImageService) {}
  
  images: Image[] = [];
  @Input() albumId: string = '';

  loadImages() {
    this.imageService.getAlbumImages(this.albumId).then(
      (images) => (this.images = images)
    );
  }
}
