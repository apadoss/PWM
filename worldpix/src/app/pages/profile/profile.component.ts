import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '@app/components/structure/sidebar/sidebar.component';
import { HeaderComponent } from '@app/components/structure/header/header.component';
import { BodyComponent } from '@app/components/structure/body/body.component';
import { Router, RouterOutlet } from '@angular/router';
import { FinalSidebarComponent } from '@app/components/final-sidebar/final-sidebar.component';
import { ImageCascadeComponent } from '@app/components/image-cascade/image-cascade.component';
import { UserService } from '@app/services/user.service';
import { User } from '../../interfaces/user';
import { get } from 'firebase/database';
import { Album } from '@app/interfaces/album'; 
import { AlbumService } from '@app/services/album.service';
import { ImageService } from '@app/services/image.service';
import { Image } from '@app/interfaces/image'; 
import { NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ NgFor, CommonModule, SidebarComponent, HeaderComponent, BodyComponent, FinalSidebarComponent, RouterOutlet, ImageCascadeComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit{
  user: User | null = null;
  albums: Album[] = [];
  favorites: string[] = [];
  albumsCount: number = 0;
  photosCount: number = 0;

  constructor(public userService: UserService, private albumService: AlbumService, private imageService: ImageService) {}

   /* User: user;
    console.log(user.email);
    const username = user.email;
/*
    interface User {
      actualUser = await getUser(UserService.currentUser)
    }*/

    async ngOnInit(): Promise<void> {
      try {
        this.user = await this.userService.getCurrentUser();
        console.log(this.user);
        if (this.user) {
          const currentUserId = await this.userService.getUserIdByEmail(this.user.email);
          console.log(currentUserId);
          if (currentUserId){
            await this.loadUserAlbums(currentUserId);
            console.log(this.countUserTotalPhotos());
          }
        }
      } catch (error) {
        console.log("error");
        console.error("Error fetching current user:", error);
      }
    }

    private async loadUserAlbums(userId: string): Promise<void> {
      try {
        this.albums = await this.albumService.getUserAlbums(userId);
        this.albumsCount = this.albums.length;
        this.favorites = this.albums
        .filter(album => album.favorited)
        .map(album => album.name);
        console.log("aaa", this.favorites)
      } catch (error) {
        console.error('Error fetching user albums:', error);
      }
    }

    private async countUserTotalPhotos(): Promise<number> {
      let finalResult = 0;
      this.albums.forEach(async album => {
        if (album.id){
        const result = await this.imageService.getAlbumImagesNumber(album.id, 2);
        finalResult = finalResult + result;
        }
      });
      return finalResult;
    }
}
