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

  addAlbum(album: Album) {
    return addDoc(this.albumDoc, album);
  }

  getAlbum(id: string) {
    const albumRef = doc(this.albumDoc, `${id}`);
    return docData(albumRef, {idField: 'id'}) as Observable<Album>;
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
