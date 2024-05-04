import { Component, EventEmitter, Output } from '@angular/core';
import { GenericButtonComponent } from '../buttons/generic-button/generic-button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ GenericButtonComponent, FormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})

export class RegisterFormComponent {
  @Output() switchForm: EventEmitter<any> = new EventEmitter();

  username = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor() { }

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
    var confirmPasswordField = <HTMLInputElement>document.querySelector("input[name='confirmPassword']");
    if(!!this.password && this.password != this.confirmPassword) {
      if (confirmPasswordField.validationMessage === "Passwords don't match") {
        confirmPasswordField.checkValidity();
      }  else {
        confirmPasswordField.setCustomValidity("Passwords don't match");
        confirmPasswordField.reportValidity();
      }
    } else {
      confirmPasswordField.setCustomValidity('');
    }
    return confirmPasswordField.validationMessage;
}
}
