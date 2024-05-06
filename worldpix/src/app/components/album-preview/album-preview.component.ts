import { Component, Input } from '@angular/core';
import { ImageService } from '@app/services/image.service';
import { Image } from '../../interfaces/image';
import { CommonModule, NgFor } from '@angular/common';
import { AlbumService } from '@app/services/album.service';
import { Album } from '@app/interfaces/album';

@Component({
  selector: 'app-album-preview',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './album-preview.component.html',
  styleUrl: './album-preview.component.css'
})
export class AlbumPreviewComponent {
  constructor(private imageService: ImageService, private albumService: AlbumService) {}
  
  @Input() albumId: string = '';
  images: Image[] = [];
  name = 'Album name'

  ngAfterViewInit() {
    this.loadData(this.albumId);
  }

  async loadData(id: string) {
    this.name = (<Album> await this.albumService.getAlbum(id)).name;
    this.imageService.getAlbumImages(id).then(
      (images) => (this.images = images)
    ).then(() => {
      this.images = this.images.slice(0,4);
    });
  }
}
