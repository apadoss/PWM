import { Component, EventEmitter, Output } from '@angular/core';
import { GenericButtonComponent } from '../buttons/generic-button/generic-button.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ GenericButtonComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})

export class RegisterFormComponent {
  @Output() switchForm: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  switchForms() {
    this.switchForm.emit();
  }

  signUp(): void {
    alert('sign up pressed');
  }

  validatePassword() {
    var password = <HTMLInputElement>document.querySelector("input[name='passwordField']");
    var confirmPassword = <HTMLInputElement>document.querySelector("input[name='confirmPassword']");

    if(!!password.value && password.value != confirmPassword.value) {
      if (confirmPassword.validationMessage === "Passwords don't match") {
        confirmPassword.setCustomValidity('');
      }  else {
        confirmPassword.setCustomValidity("Passwords don't match");
        confirmPassword.reportValidity();
      }
    } else {
      confirmPassword.setCustomValidity('');
    }
    return(confirmPassword.validationMessage);
}
}
