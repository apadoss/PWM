import { Injectable } from '@angular/core';
import { Image } from '../ImageManager/image-manager.service';
import { v4 as uuid } from 'uuid';

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

export let albums : { [id: string]: Album; };

@Injectable({
  providedIn: 'root'
})

export class AlbumManagerService {
  
  constructor() {

    albums = {};
  }

  //Returns array containing created dictionary and result of potential auto-add operation 
  generateAlbum(autoAdd=true, name='No user name', userID='No user ID', albumID='No album ID', datestart='No start date', dateend='No end date', cityname='No city', coordinates=[0.0,0.0], description='No description', images: {[id: string]: Image} = {}) {
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

getAlbum(id: string) {
  if (id in albums) return albums[id];
  return null;
}

getAlbums() {
  return albums;
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
//Also, does not come with safety checks- it just happens
addImage(album: Album, imageJSON: Image, imageID = album["albumID"] + '-' + uuid()) {
  let newImage = imageJSON;
  newImage["imageID"] = imageID;
  album["images"][imageID] = newImage;
}

removeImage(album: Album, image: Image) {
  if (album["images"] && album["images"].hasOwnProperty(image["imageID"])) {
      delete album["images"][image["imageID"]];
      return true;
  }
  return false;
}

//Missing safety check
getImage(album: Album, ID: string) {
  return album["images"][ID];
}

replaceImage(album: Album, replacedImage: Image, newImage: Image) {
  newImage["imageID"] = replacedImage["imageID"];
  album["images"][newImage["imageID"]] = newImage;
}

}
