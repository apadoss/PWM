import { Component } from '@angular/core';
import { Generic2ButtonComponent } from '../buttons/generic2-button/generic2-button.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ Generic2ButtonComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})

export class LoginFormComponent {

  constructor() { }

  signUp(): void {
    alert('sign up pressed');
  }
}
