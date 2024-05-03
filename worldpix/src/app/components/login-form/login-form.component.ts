import { Component } from '@angular/core';
import { GenericButtonComponent } from '../buttons/generic-button/generic-button.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ GenericButtonComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})

export class LoginFormComponent {

  constructor() { }

  signUp(): void {
    alert('sign up pressed');
  }
}
