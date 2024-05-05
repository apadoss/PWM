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

  generateImage(ID="No image ID", name="No filename", date='No date', description='No description', image="/image/link", albumID = '') {
    let returner: Image = {
        "albumId": albumID,
        "id": ID,
        "name": name,
        "date": date,
        "description": description,
        "imageURL": image,
    };
    return returner;
}

  addImage(album: Album, image: Image, imageID = album.id + '-' + uuid()) {
    let newImage = image;
    newImage.id = imageID;
    newImage.albumId = album.id!;
    return addDoc(this.imageDoc, newImage);
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

  async uploadImage() {
    const storage = getStorage(this.app);
    const fileInput = document.getElementById("image-upload") as HTMLInputElement;
    var file: File;
    var imageURL: string = '';

    if (fileInput.files) { 
      file = fileInput.files[0];
      const storageRef = ref(storage, `images/${file.name}`)

      await uploadBytes(storageRef, file)
      .then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          imageURL = url;
        })
      });
    }

    return imageURL;
  }
}
