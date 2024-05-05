import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { CollectionReference, DocumentData, Firestore, docData } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { enviroment } from '../app.config';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Image } from '../interfaces/image';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Album } from '../interfaces/album';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  app: FirebaseApp;
  database: Firestore;
  imageDoc: CollectionReference<DocumentData>;

  constructor() { 
    this.app = initializeApp(enviroment);
    this.database = getFirestore(this.app);
    this.imageDoc = collection(this.database, "Image");
  }

  async generateImage(image: File, description='No description') {
    let url = await this.uploadImage(image);
    console.log("ureles", url, await url);
    let returner: Image = {
        "albumId": '',
        "id": '',
        "name": image.name,
        "date": this.extractImageDate(image).toDateString(),
        "description": description,
        "imageURL": await url,
    };
    return returner;
}

  async addImage(album: Album, image: Image) {
    let newImage = image;
    newImage.albumId = album.id!;
    let generatedID = (await addDoc(this.imageDoc, newImage)).id;
    this.setImageId(generatedID);
    return generatedID;
  }

  setImageId(inputid: string) {
    const imageRef = doc(this.imageDoc, `${inputid}`);
    return updateDoc(imageRef, { id: inputid });
  }

  extractImageDate(file: File) {
    return new Date(file.lastModified);
  }

  getImage(id: string) {
    const imageRef = doc(this.imageDoc, `${id}`);
    return docData(imageRef, {idField: 'id'}) as Observable<Image>;
  }

  async getAlbumImages(albumId: string, howMany: number = -1) {
    const q = query(this.imageDoc, where("albumId", "==", albumId));
    const querySnapshot = await getDocs(q);

    var result: Image[] = [];
    querySnapshot.forEach((doc) => {
      const image: Image = {
        id: doc.id,
        name: doc.data()["name"],
        description: doc.data()["description"],
        imageURL: doc.data()["image"],
        date: doc.data()["date"],
        albumId: doc.data()["albumId"]
      }
      result.push(image);
    });

    if (howMany != -1 && howMany < result.length) {
      result = result.slice(0, howMany);
    }

    return result;
  }

   deleteImage(id: string) {
    const docRef = doc(this.database, 'Image', id);
    return deleteDoc(docRef);;
  }

  modifyImageName(id: string, newName: string) {
    const albumRef = doc(this.imageDoc, `${id}`);
    return updateDoc(albumRef, { name: newName });
  }

  modifyImageDescription(id: string, newDescription: string) {
    const albumRef = doc(this.imageDoc, `${id}`);
    return updateDoc(albumRef, { description: newDescription });
  }

  async uploadImage(file: File) {
    const storage = getStorage(this.app);
    //const fileInput = document.getElementById("image-upload") as HTMLInputElement;
    //var file: File;
    var imageURL: string = '';

    if (file) { 
      const storageRef = ref(storage, `images/${file.name}`);

      try {
          const snapshot = await uploadBytes(storageRef, file);
          const url = await getDownloadURL(snapshot.ref);
          console.log("url", url);
          imageURL = url;
      } catch (error) {
          console.error("Error uploading image:", error);
      }
    }

    console.log("imageURL", imageURL);
    return imageURL;
  }
}
