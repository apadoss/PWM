import { Component } from '@angular/core';

@Component({
  selector: 'app-album-loader',
  standalone: true,
  imports: [],
  templateUrl: './album-loader.component.html',
  styleUrl: './album-loader.component.css'
})

export class AlbumLoaderComponent {

}

export interface Album {
  name: string,
  albumID: string,
  date-start: 
  date-end
  city-name
  coordinates
}

function loadAlbum(album, render=true) {
  if (albums.hasKey(album.albumID)) {
    delete albums[album.albumID];
  }
  albums[album.albumID] = album;
  if (render) {
    renderAlbum(album);
  }
  /*name
  albumID
  date-start
  date-end
  city-name
  coordinates
  */
  const box = new THREE.BoxHelper( icon, 0xffff00 );
  scene.add( box );
}