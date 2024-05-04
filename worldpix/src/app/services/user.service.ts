import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { CollectionReference, DocumentData, Firestore, docData } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { enviroment } from '../app.config';
import { addDoc, collection, deleteDoc, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  app: FirebaseApp;
  database: Firestore;
  userDoc: CollectionReference<DocumentData>

  constructor() { 
    this.app = initializeApp(enviroment);
    this.database = getFirestore();
    this.userDoc = collection(this.database, "User");
  }

  async registerUser(user: User) {
    var username = user.username;
    var password = user.password;
    console.log("a")
    
    try {
      // Create user document in Firestore
      await addDoc(this.userDoc, {username , password });
      console.log("User registered successfully");
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

  addUser(user: User) {
    return addDoc(this.userDoc, user);
  }

  getUser(id: string) {
    const userRef = doc(this.userDoc, `${id}`);
    return docData(userRef, {idField: 'id'}) as Observable<User>;
  }

  deleteUser(id: string) {
    const userRef = doc(this.database, 'User', id);
    return deleteDoc(userRef);
  }

  modifyUserEmail(id: string, newEmail: string) {
    const userRef = doc(this.userDoc, `${id}`);
    return updateDoc(userRef, { email: newEmail });
  }

  modifyUserUsername(id: string, newUsername: string) {
    const userRef = doc(this.userDoc, `${id}`);
    return updateDoc(userRef, { username: newUsername });
  }

  modifyUserPassword(id: string, newPassword: string) {
    const userRef = doc(this.userDoc, `${id}`);
    return updateDoc(userRef, { password: newPassword });
  }
}
