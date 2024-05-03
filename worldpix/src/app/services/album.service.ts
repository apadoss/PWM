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
  
    var result: Object[] = [];
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
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
