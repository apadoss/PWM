import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { CollectionReference, DocumentData, Firestore, docData } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { enviroment } from '../app.config';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import { Album } from '../interfaces/album';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  app: FirebaseApp;
  database: Firestore;
  albumDoc: CollectionReference<DocumentData>

  constructor() { 
    this.app = initializeApp(enviroment);
    this.database = getFirestore();
    this.albumDoc = collection(this.database, "Album");
  }

  generateAlbum(name='No user name', userID='No user ID', albumID='No album ID', datestart='No start date', dateend='No end date', cityname='No city', coordinates=[0.0,0.0], description='No description') {
    let returner: Album = {
        "name": name,
        "userId": userID,
        "id": albumID,
        "dateStart": datestart,
        "dateEnd": dateend,
        "cityName": cityname,
        "coordinates": coordinates,
        "description": description,
    };
    return returner;
}

  addAlbum(album: Album) {
    return addDoc(this.albumDoc, album);
  }

  /*async getAlbum(id: string) {
    const albumRef = doc(this.albumDoc, `${id}`);
    return docData(albumRef, {idField: 'id'})
  }*/

  /*async getAlbum(id: string): Promise<Album> {
    try {
      const albumRef = doc(this.albumDoc, id);
      const albumData = await docData(albumRef).toPromise();
      // Manually set the id field of the returned Album object
      const album: Album = { ...albumData, id };
      return album;
    } catch (error) {
      console.error('Error fetching album:', error);
      throw error;
    }
  }*/

  async getAlbum(id: string): Promise<Album> {
    try {
      const albumRef = doc(this.albumDoc, id);
      const albumData = await docData(albumRef).toPromise();
      return albumData as Album;
    } catch (error) {
      console.error('Error fetching album:', error);
      throw error;
    }
  }

  async getUserAlbums(userId: string) {
    const q = query(this.albumDoc, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
  
    var result: Album[] = [];
    querySnapshot.forEach((doc) => {
      const album: Album = {
        id: doc.id,
        name: doc.data()["name"],
        description: doc.data()["description"],
        dateStart: doc.data()["date-start"],
        dateEnd: doc.data()["date-end"],
        cityName: doc.data()["city-name"],
        coordinates: doc.data()["coordinates"],
        userId: doc.data()["userId"]
      }
      result.push(album);
    });
    return result;
  }

  deleteAlbum(id: string) {
    const docRef = doc(this.database, 'Album', id);
    return deleteDoc(docRef);
  }

  modifyAlbumName(id: string, newName: string) {
    const albumRef = doc(this.albumDoc, `${id}`);
    return updateDoc(albumRef, { name: newName });
  }

  modifyAlbumDescription(id: string, newDescription: string) {
    const albumRef = doc(this.albumDoc, `${id}`);
    return updateDoc(albumRef, { description: newDescription });
  }
}
