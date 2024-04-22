import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { enviroment } from './app.config';
import { CollectionReference, DocumentData, QuerySnapshot, addDoc, collection, deleteDoc, doc, getDocs, getFirestore, onSnapshot, updateDoc } from 'firebase/firestore';
import { Subject } from 'rxjs';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { FirebaseApp } from '@angular/fire/app';
import fs from "fs";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  app: FirebaseApp;
  database: Firestore;
  userTable: CollectionReference<DocumentData>;
  albumTable: CollectionReference<DocumentData>;
  imageTable: CollectionReference<DocumentData>;

  private updatedSnapshot = new Subject<QuerySnapshot<DocumentData>>();

  constructor() {
    this.app = initializeApp(enviroment);
    this.database = getFirestore();

    this.userTable = collection(this.database, 'User');
    this.albumTable = collection(this.database, 'Album');
    this.imageTable = collection(this.database, 'Image');

    onSnapshot(this.userTable, (snapshot) => {
      this.updatedSnapshot.next(snapshot);
    }, (err) => {
      console.log(err);
    });

    onSnapshot(this.albumTable, (snapshot) => {
      this.updatedSnapshot.next(snapshot);
    }, (err) => {
      console.log(err);
    });

    onSnapshot(this.imageTable, (snapshot) => {
      this.updatedSnapshot.next(snapshot);
    }, (err) => {
      console.log(err);
    });
  }

  async getUsers() {
    const snapshot = await getDocs(this.userTable);
    return snapshot;
  }

  async getAlbums() {
    const snapshot = await getDocs(this.albumTable);
    return snapshot;
  }

  async getImages() {
    const snapshot = await getDocs(this.imageTable);
    return snapshot;
  }

  async addUser(uid: number, email: string, password: string) {
    await addDoc(this.userTable, {
      uid,
      email,
      password
    });
    return;
  }

  async addAlbum(albumId: number, name: string, description: string, cityName: string, coordinates: GeolocationPosition, dateStart: Date, dateEnd: Date, images: Array<CollectionReference>, uid: number) {
    await addDoc(this.albumTable, {
      albumId,
      name,
      description, 
      cityName, 
      coordinates, 
      dateStart, 
      dateEnd, 
      images, 
      uid
    });
    return;
  }

  async addImages(imageId: number, filename: string, image: URL, date: Date, description: string) {
    await addDoc(this.imageTable, {
      imageId,
      filename,
      image,
      date,
      description
    });
    return;
  }

  async deleteUser(tableId: string) {
    const docRef = doc(this.database, 'User', tableId);
    await deleteDoc(docRef);
    return;
  }

  async deleteAlbum(tableId: string) {
    const docRef = doc(this.database, 'Album', tableId);
    await deleteDoc(docRef);
    return;
  }

  async deleteImage(tableId: string) {
    const docRef = doc(this.database, 'Image', tableId);
    await deleteDoc(docRef);
    return;
  }

  async updateUser(tableId: string, uid: number, email: string, password: string) {
    const docRef = doc(this.database, 'User', tableId);
    await updateDoc(docRef, {
      uid,
      email,
      password
    });
    return;
  }

  async updateAlbum(tableId: string, albumId: number, name: string, description: string, cityName: string, coordinates: GeolocationPosition, dateStart: Date, dateEnd: Date, images: Array<CollectionReference>, uid: number) {
    const docRef = doc(this.database, 'Album', tableId);
    await updateDoc(docRef, {
      albumId,
      name,
      description, 
      cityName, 
      coordinates, 
      dateStart, 
      dateEnd, 
      images, 
      uid
    });
    return;
  }

  async updateImages(tableId: string, imageId: number, filename: string, image: URL, date: Date, description: string) {
    const docRef = doc(this.database, 'Image', tableId);
    await updateDoc(docRef, {
      imageId,
      filename,
      image,
      date,
      description
    });
    return;
  }

  async uploadImage(event: Event) {
    const storage = getStorage(this.app);
    const fileInput = document.getElementById("test") as HTMLInputElement;
    var file: File;

    if (fileInput.files) { 
      file = fileInput.files[0];
      const storageRef = ref(storage, `images/${file.name}`)
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded');
      });
    }


    //let blob = new Blob([buffer]);
  }
}
