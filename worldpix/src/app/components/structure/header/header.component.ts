import { Component} from '@angular/core';
import { WorldpixLogoComponent } from '../worldpix-logo/worldpix-logo.component';
import { HamburgerMenuComponent } from "./hamburger-menu/hamburger-menu.component";
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    imports: [WorldpixLogoComponent, HamburgerMenuComponent, NgIf]
})
export class HeaderComponent {
  showMenu = false;
  image = "assets/hamburger-menu.png";

  constructor(private router: Router) { }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    this.image = this.showMenu ? "assets/close.png" : "assets/hamburger-menu.png";
  }

  navigate(page: string) {
    this.router.navigateByUrl(page);
  }
}
