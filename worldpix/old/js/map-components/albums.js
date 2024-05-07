import {v4 as uuidv4} from 'uuid';

export function imageBufferToBlob(buffer) {
    const blob = new Blob([buffer]);
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl;
}

export async function imageBlobToBuffer(blob) {
    const response = await fetch(blobUrl);
    if (!response.ok) {
        throw new Error('Error with blob image link');
    }
    return await response.arrayBuffer();
}

export function extractImageDate(file) {
    return new Date(file.lastModified);
}

export function imageFileToBufferArray(image) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(event) {
        const buffer = event.target.result;
        resolve(buffer);
        };
        reader.onerror = function(error) {
        reject(error);
        };
        reader.readAsArrayBuffer(image);
    });
}

export function generateImageJSON(ID="No image ID", filename="No filename", date='No date', description='No description', image=new ArrayBuffer()) {
    let returner = {
        imageID: ID,
        filename: filename,
        date: date,
        description: description,
        image: image,
    };
    return returner;
}

export function generateAlbumJSON(name='No user name', userID='No user ID', albumID='No album ID', datestart='No start date', dateend='No end date', cityname='No city', coordinates=[0.0,0.0], description='No description', images={}) {
    let buffer = [];
    let returner = {
        name: name,
        userID: userID,
        albumID: albumID,
        datestart: datestart,
        dateend: dateend,
        cityname: cityname,
        coordinates: coordinates,
        description: description,
        images: images,
    };

    return returner;
}

//I get the feeling that defining UUIDs client-side is the mother of all bad ideas
export function addImage(album, imageJSON, imageID=album["albumID"] + '-' + uuidv4()) {
    let newImage = imageJSON;
    newImage["imageID"] = imageID;
    album["images"][imageID] = newImage;
}

export function removeImage(album, ID) {
    if (album["images"] && album["images"].hasOwnProperty(ID)) {
        delete album["images"][ID];
        return true;
    }
    return false;
}

export function getImage(album, ID) {
    return album["images"][ID];
}

export function replaceImage(album, replacedID, iNewImage) {
    let newImage = iNewImage;
    newImage["imageID"] = replacedID;
    album["images"][replacedID] = newImage;
}

export function dictToJSON(dict) {
    return JSON.stringify(dict);
}

export function JSONToDict(json) {
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