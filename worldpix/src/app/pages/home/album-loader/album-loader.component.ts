import { Component } from '@angular/core';
import {v4 as uuid} from 'uuid';

@Component({
  selector: 'app-album-loader',
  standalone: true,
  imports: [],
  templateUrl: './album-loader.component.html',
  styleUrl: './album-loader.component.css'
})

export class AlbumLoaderComponent {

}

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


export interface Image {
  "imageID": string,
  "filename": string,
  "date": string,
  "description": string,
  "imageURL": string,
}

export function imageBufferToBlob(buffer: BlobPart) {
    const blob = new Blob([buffer]);
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl;
}

export async function imageBlobToBuffer(blobUrl: string) {
    const response = await fetch(blobUrl);
    if (!response.ok) {
        throw new Error('Error with blob image link');
    }
    return await response.arrayBuffer();
}

export function extractImageDate(file: File) {
    return new Date(file.lastModified);
}

export function imageFileToBufferArray(image: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(event) {
        if (!!event.target?.result) {
          const buffer = event.target.result;
          resolve(buffer);
        }
        };
        reader.onerror = function(error) {
        reject(error);
        };
        reader.readAsArrayBuffer(image);
    });
}

export function generateImageDict(ID="No image ID", filename="No filename", date='No date', description='No description', image="/image/link") {
    let returner: Image = {
        "imageID": ID,
        "filename": filename,
        "date": date,
        "description": description,
        "imageURL": image,
    };
    return returner;
}

export function generateAlbumDict(name='No user name', userID='No user ID', albumID='No album ID', datestart='No start date', dateend='No end date', cityname='No city', coordinates=[0.0,0.0], description='No description', images={}) {
    let buffer = [];
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

    return returner;
}

//I get the feeling that defining UUIDs client-side is the mother of all bad ideas
export function addImage(album: Album, imageJSON: Image, imageID = album["albumID"] + '-' + uuid()) {
    let newImage = imageJSON;
    newImage["imageID"] = imageID;
    album["images"][imageID] = newImage;
}

export function removeImage(album: Album, ID: string) {
    if (album["images"] && album["images"].hasOwnProperty(ID)) {
        delete album["images"][ID];
        return true;
    }
    return false;
}

export function getImage(album: Album, ID: string) {
    return album["images"][ID];
}

export function replaceImage(album: Album, replacedID: string, iNewImage: Image) {
    let newImage = iNewImage;
    newImage["imageID"] = replacedID;
    album["images"][replacedID] = newImage;
}

export function dictToJSON(dict: any) {
    return JSON.stringify(dict);
}

export function JSONToDict(json: string) {
    try {
        return JSON.parse(json);
    } catch (ex) {
        console.error(ex);
        return null;
    }
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