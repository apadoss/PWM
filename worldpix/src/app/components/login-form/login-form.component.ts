import { Component, EventEmitter, Output } from '@angular/core';
import { Generic2ButtonComponent } from '../buttons/generic2-button/generic2-button.component';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Valid } from '../../interfaces/valid';
import { CommonModule, NgIf } from '@angular/common';
import { User } from '../../interfaces/user';
import { GenericButtonComponent } from "../buttons/generic-button/generic-button.component";
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { CityListComponent } from "../create-album/city-list/city-list.component";

@Component({
    selector: 'app-login-form',
    standalone: true,
    templateUrl: './login-form.component.html',
    styleUrl: './login-form.component.css',
    imports: [Generic2ButtonComponent, FormsModule, NgIf, CommonModule, GenericButtonComponent, CityListComponent]
})

export class LoginFormComponent {
  @Output() switchForm: EventEmitter<any> = new EventEmitter();
  @Output() loggedIn: EventEmitter<any> = new EventEmitter();

  username: Valid = {value: '', valid: true, message: 'Username does not exist' };
  password: Valid = {value: '', valid: true, message: 'Password incorrect'};

  provider = new OpenStreetMapProvider({
    params: {
      limit: 3
    }
  });

  constructor(private userService: UserService) {
  }

  async tryLogin() {
    var user: User = {email: '', username: this.username.value, password: this.userService.hash(this.password.value)};
    var response = await this.userService.authenticateUser(user);
    if (response === "user") {
      this.username.valid = false;
    } else if (response === "pass") {
      this.password.valid = false;
    } else {
      this.loggedIn.emit(response);
    }
  }

  async validateUserName() {
    if (await !this.userService.userNameExists(this.username.value)) {
      this.username.valid = false;
      return false;
    }
    return true;
  }

  switchForms() {
    this.switchForm.emit();
  }

  typingTimer: any;
  typingDelay: number = 200;

  onKeyUp() {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.fireEvent(); // Fire your custom event after the delay
    }, this.typingDelay);
  }

  onKeyDown() {
    clearTimeout(this.typingTimer);
  }

  fireEvent() {
    this.fetchCities();
  }

  selected(city: any) {
    console.log(city)
  }

  async fetchCities() {
    console.log(await this.provider.search( {query: "Paris"} ));
  }
}
