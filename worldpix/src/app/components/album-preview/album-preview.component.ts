import { Component, Input } from '@angular/core';
import { ImageService } from '@app/services/image.service';

@Component({
  selector: 'app-album-preview',
  standalone: true,
  imports: [],
  templateUrl: './album-preview.component.html',
  styleUrl: './album-preview.component.css'
})
export class AlbumPreviewComponent {
  constructor(private imageService: ImageService) {}
  
  @Input() albumId: string = '';
  images: Image[] = [];

  ngAfterViewInit() {
    this.loadImages();
  }

  loadImages() {
    this.imageService.getAlbumImages(this.albumId).then(
      (images) => (this.images = images)
    ).then(() => {
      console.log(this.images)
    });
  }
}
