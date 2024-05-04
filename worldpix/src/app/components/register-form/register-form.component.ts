import { Component, EventEmitter, Output } from '@angular/core';
import { GenericButtonComponent } from '../buttons/generic-button/generic-button.component';
import { FormsModule } from '@angular/forms';
import { Valid } from '../../interfaces/valid';
import { CommonModule, NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ GenericButtonComponent, FormsModule, NgIf, CommonModule ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})

export class RegisterFormComponent {
  @Output() switchForm: EventEmitter<any> = new EventEmitter();
  @Output() registered: EventEmitter<any> = new EventEmitter();

  passwordError = "Password error"
  username: Valid = {value: '', valid: true};
  email: Valid = {value: '', valid: true};;
  password: Valid = {value: '', valid: true};;
  confirmPassword: Valid = {value: '', valid: true};;

  constructor(private userService: UserService) { }

  ngOnInit() {

  }

  switchForms() {
    this.switchForm.emit();
  }

  /*resetValidity() {
    var confirmPasswordField = <HTMLInputElement>document.querySelector("input[name='confirmPassword']");
    confirmPasswordField.setCustomValidity('');
  }*/

  validatePassword() {
    var passwordField = <HTMLInputElement>document.querySelector("input[name='passwordField']");
    if (!!passwordField && passwordField.validity.patternMismatch) {
      this.passwordError = "Must contain 8 alphanumeric and special characters"
      this.password.valid = false;
      return false;
    }
    if(this.password.value != this.confirmPassword.value) {
      if (this.password.valid) {
        this.passwordError = "Passwords do not match";
        this.password.valid = false;
      }
      return false;
    }
    return true;
  }

  async validateUserName() {
    if (await this.userService.userNameExists(this.username.value)) {
      this.username.valid = false;
      return false;
    }
    return true;
  }

  async validateEmail() {
    if (await this.userService.emailExists(this.email.value)) {
      this.email.valid = false;
      return false;
    }
    return true;
  }

  async register() {
    let buffer1 = await this.validatePassword();
    let buffer2 = await this.validateEmail();
    let buffer3 = await this.validateUserName();
    if (buffer1 && buffer2 && buffer3) {
      let user: User = {email: this.email.value, username: this.username.value, password: this.userService.hash(this.password.value)}
      this.registered.emit(this.userService.addUser(user));
    }
  }
}
