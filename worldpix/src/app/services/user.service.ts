import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { CollectionReference, DocumentData, Firestore, docData } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { enviroment } from '../app.config';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import { User } from '../interfaces/user';
import { Observable, BehaviorSubject, firstValueFrom } from 'rxjs';
import bcrypt from 'bcryptjs';
import jsSHA from 'jssha';
import { user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  app: FirebaseApp;
  database: Firestore;
  userDoc: CollectionReference<DocumentData>
  salt = bcrypt.genSaltSync(10);
  static currentUser: string = "default"; 
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUserObject: Observable<User | null>;

  constructor() { 
    this.app = initializeApp(enviroment);
    this.database = getFirestore(this.app);
    this.userDoc = collection(this.database, "User");
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUserObject = this.currentUserSubject.asObservable();

  }
  

  /*async registerUser(user: User) {
    var username = user.username;
    var password = user.password;
    
    try {
      // Create user document in Firestore
      await addDoc(this.userDoc, {username , password });
      console.log("User registered successfully");
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }*/

  /*hash(password: string) {
    this.hash2(password);
    return bcrypt.hashSync(password, this.salt);
  }*/

  hash(password: string) {
    var hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    hashObj.update(password);
    return hashObj.getHash("HEX");
  }

  async addUser(user: User) {
    let buffer = await addDoc(this.userDoc, user);
    return this.authenticateUser(user);
  }


  /*async addUser(user: User): Promise<string> {
    try {
      // Check if username already exists
      const existingUserQuery = query(this.userDoc, where("username", "==", user.username));
      const existingUserSnapshot = await getDocs(existingUserQuery);
      if (!existingUserSnapshot.empty) {
        throw new Error("Username already exists");
      }

      // Add user to database if username doesn't exist
      const newUserRef = await addDoc(this.userDoc, user);
      console.log("User registered successfully");

      // Return the ID of the newly created user
      return newUserRef.id;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }*/

  async authenticateUser(user: User): Promise<string> {
    var username = user.username;
    var password = user.password;
    try {
      const userQuery = query(this.userDoc, where("username", "==", username));
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        return "user";
      }

      const userData = userSnapshot.docs[0].data() as User;

      if (password === userData.password) {
        this.setCurrentUser(userData);
        return userSnapshot.docs[0].id;
      } else {
        return "pass"
      }
    } catch (error) {
      console.error("Error authenticating user:", error);
      throw error;
    }
  }

  getUser(id: string) {
    const userRef = doc(this.userDoc, `${id}`);
    return docData(userRef, {idField: 'id'}) as Observable<User>;
  }

  private setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  public getCurrentUserObservable(): Observable<User | null> {
    return this.currentUserObject;
  }

  public async getCurrentUser(): Promise<User | null> {
    

    const currentUser = this.currentUserSubject.value;
  
  // Check if currentUser is not null
  if (!currentUser) {
    console.log("Current user is null");
    return null;
  }
  
  try {
    const userQuery = query(this.userDoc, where("email", "==", currentUser.email));
    const userSnapshot = await getDocs(userQuery);
    
    if (userSnapshot.empty) {
      console.log("Error al cargar el usuario actual");
      return null;
    }

    const userData = userSnapshot.docs[0].data() as User;
    this.setCurrentUser(userData);
    return userData;

  } catch (error) {
    console.log("Error al cargar el usuario actual");
    console.error(error);
    return null;
  }
}

public async getUserIdByEmail(email: string): Promise<string | null> {
  try {
    const userQuery = query(this.userDoc, where("email", "==", email));
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      console.log("No user found with the given email.");
      return null;
    }

    return userSnapshot.docs[0].id;
  } catch (error) {
    console.error("Error fetching user ID by email:", error);
    return null;
  }
}



  async userNameExists(username: string) {
    const userQuery = query(this.userDoc, where("username", "==", username));
    const userSnapshot = await getDocs(userQuery);
    if (userSnapshot.empty) {
      return false;
    }
    const userData = userSnapshot.docs[0].data() as User;
    return true;
  }

  async emailExists(email: string) {
    const userQuery = query(this.userDoc, where("email", "==", email));
    const userSnapshot = await getDocs(userQuery);
    if (userSnapshot.empty) {
      return false;
    }
    return true;
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
