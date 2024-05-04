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

  signUp(): void {
    alert('sign up pressed');
  }
}
