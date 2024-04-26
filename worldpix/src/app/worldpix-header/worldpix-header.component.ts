import { Component, Input } from '@angular/core';
import { WorldpixLogoComponent } from '../worldpix-logo/worldpix-logo.component';
import { HamburgerMenuComponent } from "./hamburger-menu/hamburger-menu.component";
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-worldpix-header',
    standalone: true,
    templateUrl: './worldpix-header.component.html',
    styleUrl: './worldpix-header.component.css',
    imports: [WorldpixLogoComponent, HamburgerMenuComponent, NgIf]
})
export class WorldpixHeaderComponent {
  showMenu = false;
  @Input() image = "assets/hamburger-menu.png";

  constructor() { }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    this.image = this.showMenu ? "assets/close.png" : "assets/hamburger-menu.png";
  }
}
