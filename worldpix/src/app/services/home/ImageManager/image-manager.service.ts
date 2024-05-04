import { Injectable } from '@angular/core';

/*export interface Image {
  "imageID": string,
  "filename": string,
  "date": string,
  "description": string,
  "imageURL": string,
}*/

@Injectable({
  providedIn: 'root'
})

export class ImageManagerService {

  constructor() { }

  imageBufferToBlob(buffer: BlobPart) {
    const blob = new Blob([buffer]);
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl;
}

async imageBlobToBuffer(blobUrl: string) {
    const response = await fetch(blobUrl);
    if (!response.ok) {
        throw new Error('Error with blob image link');
    }
    return await response.arrayBuffer();
}

extractImageDate(file: File) {
    return new Date(file.lastModified);
}

imageFileToBufferArray(image: File) {
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

generateImageDict(ID="No image ID", filename="No filename", date='No date', description='No description', image="/image/link") {
    let returner: Image = {
        "imageID": ID,
        "filename": filename,
        "date": date,
        "description": description,
        "imageURL": image,
    };
    return returner;
}
}
