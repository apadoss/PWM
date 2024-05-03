import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  static mobileWidth = 390;

  constructor() { }

  static getDevice() {
    let returner: String;
    if (window.innerWidth >= this.mobileWidth) {
      console.log(window.innerWidth)
      returner = "desktop";
    } else {
      returner = "mobile";
    }
    return returner;
  }

  //Unused, intended for light/dark mode in the future
  getDisplayMode() {

  }
}
