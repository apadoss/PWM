import { Component } from '@angular/core';
import { GenericButtonComponent } from '../buttons/generic-button/generic-button.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ GenericButtonComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})

export class RegisterFormComponent {

  constructor() { }

  ngOnInit() {

  }

  signUp(): void {
    alert('sign up pressed');
  }

  validatePassword() {
    var password = <HTMLInputElement>document.querySelector("input[name='passwordField']");
    var confirmPassword = <HTMLInputElement>document.querySelector("input[name='confirmPassword']");
    console.log("a")

    if(!!password && !!confirmPassword && password.value != confirmPassword.value) {
      if (confirmPassword.validationMessage === "Passwords don't match") {
        confirmPassword.setCustomValidity('');
      }  else {
        confirmPassword.setCustomValidity("Passwords don't match");
        confirmPassword.reportValidity();
      }
      } else {
        confirmPassword.setCustomValidity('');
      }
    
    //password.onchange = validatePassword;
    //confirmPassword.onkeyup = validatePassword;
}
}
