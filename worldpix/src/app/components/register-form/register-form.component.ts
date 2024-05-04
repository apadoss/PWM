import { Component, EventEmitter, Output } from '@angular/core';
import { GenericButtonComponent } from '../buttons/generic-button/generic-button.component';
import { FormsModule } from '@angular/forms';
import { Valid } from '../../interfaces/valid';
import { CommonModule, NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ GenericButtonComponent, FormsModule, NgIf, CommonModule ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})

export class RegisterFormComponent {
  @Output() switchForm: EventEmitter<any> = new EventEmitter();

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

  signUp(): void {
    alert('sign up pressed');
  }

  resetValidity() {
    var confirmPasswordField = <HTMLInputElement>document.querySelector("input[name='confirmPassword']");
    confirmPasswordField.setCustomValidity('');
  }

  validatePassword() {
    var passwordField = <HTMLInputElement>document.querySelector("input[name='passwordField']");
    if (!!passwordField && passwordField.validity.patternMismatch) {
      this.passwordError = "Must contain 8 alphanumeric and special characters"
      this.confirmPassword.valid = false;
      return false;
    }
    if(this.password.value != this.confirmPassword.value) {
      if (this.confirmPassword.valid) {
        this.passwordError = "Passwords do not match";
        this.confirmPassword.valid = false;
      }
      return false;
    }
    return true;
  }

  register() {
    if (this.validatePassword() && this.userService.)
  }
}
