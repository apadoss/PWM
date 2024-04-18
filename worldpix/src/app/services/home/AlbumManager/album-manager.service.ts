import { Injectable } from '@angular/core';
import { Image } from '../ImageManager/image-manager.service';
import { uuid } from 'uuidv4';

export interface Album {
  "name": string,
  "userID": string,
  "albumID": string,
  "date-start": string,
  "date-end": string,
  "city-name": string,
  "description": string,
  "coordinates": number[],
  "images": {[id: string]: Image},
}

let albums : { [id: string]: Album; };

@Injectable({
  providedIn: 'root'
})

export class AlbumManagerService {
  
  constructor() {
    albums = {};
    this.generateAlbumDict(true, "John","01","01","18/04/2024","18/07/2024","Paris",[48.8566, 2.3522], "Description");
  }

  //Returns array containing created dictionary and result of potential auto-add operation 
  generateAlbumDict(autoAdd=true, name='No user name', userID='No user ID', albumID='No album ID', datestart='No start date', dateend='No end date', cityname='No city', coordinates=[0.0,0.0], description='No description', images: {[id: string]: Image} = {}) {
    let returner: Album = {
        "name": name,
        "userID": userID,
        "albumID": albumID,
        "date-start": datestart,
        "date-end": dateend,
        "city-name": cityname,
        "coordinates": coordinates,
        "description": description,
        "images": images,
    };

    if (autoAdd && !this.addAlbum(returner)) return [returner, false];

    return [returner, true];
}

addAlbum(album: Album, force = false) {
  if (album["albumID"] in albums && !force) {
    return false;
  }
  albums[album["albumID"]] = album;
  return true;
}

removeAlbum(albumID: string) {
  if(albumID in albums) {
    delete albums[albumID];
    return true;
  }
  return false;
}

dictToJSON(dict: any) {
    return JSON.stringify(dict);
}

JSONToDict(json: string) {
    try {
        return JSON.parse(json);
    } catch (ex) {
        console.error(ex);
        return null;
    }
}

//I get the feeling that defining UUIDs client-side is the mother of all bad ideas
//Also, does not come with safety checks other than existence of album- it just happens
addImage(albumID: string, imageJSON: Image, imageID = albumID + '-' + uuid()) {
  if (albumID in albums) {
    let newImage = imageJSON;
    newImage["imageID"] = imageID;
    albums[albumID]["images"][imageID] = newImage;
    return true;
  }
  return false;
}

removeImage(album: Album, ID: string) {
  if (album["images"] && album["images"].hasOwnProperty(ID)) {
      delete album["images"][ID];
      return true;
  }
  return false;
}

getImage(album: Album, ID: string) {
  return album["images"][ID];
}

replaceImage(album: Album, replacedID: string, iNewImage: Image) {
  let newImage = iNewImage;
  newImage["imageID"] = replacedID;
  album["images"][replacedID] = newImage;
}

//Basic structure of album JSON
/*
{
    name: string,
    userID: string,
    albumID: string,
    date-start: Date,
    date-end: Date,
    city-name: string,
    description: string,
    coordinates: [float, float],
    images: {image JSONs},
}

//Basic structure of image JSON

{
    imageID: string,
    filename: string,
    date: Date,
    description: string,
    image: ArrayBuffer,
}
*/
}
