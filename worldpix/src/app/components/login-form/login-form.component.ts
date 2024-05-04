import { Component, EventEmitter, Output } from '@angular/core';
import { GenericButtonComponent } from '../buttons/generic-button/generic-button.component';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Valid } from '../../interfaces/valid';
import { CommonModule, NgIf } from '@angular/common';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ GenericButtonComponent, FormsModule, NgIf, CommonModule ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})

export class LoginFormComponent {
  @Output() switchForm: EventEmitter<any> = new EventEmitter();
  @Output() loggedIn: EventEmitter<any> = new EventEmitter();

  username: Valid = {value: '', valid: true};
  password: Valid = {value: '', valid: true};;

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
}
