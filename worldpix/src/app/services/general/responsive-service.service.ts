import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  static mobileWidth = 390;

  constructor() { }

  static getDevice(): string {
    //let returner: string = "unknown";
    if (window.innerWidth >= this.mobileWidth) {
      return "desktop";
    } else {
      return "mobile";
    }
    //return returner;
  }

  //Unused, intended for light/dark mode in the future
  getDisplayMode() {

  }
}
