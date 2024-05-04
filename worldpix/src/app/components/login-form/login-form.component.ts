import { Component, EventEmitter, Output } from '@angular/core';
import { GenericButtonComponent } from '../buttons/generic-button/generic-button.component';
import { UserService } from '../../services/user.service';
import { User } from 'firebase/auth';
import { FormsModule } from '@angular/forms';
import { Valid } from '../../interfaces/valid';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ GenericButtonComponent, FormsModule, NgIf, CommonModule ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})

export class LoginFormComponent {
  @Output() switchForm: EventEmitter<any> = new EventEmitter();

  username: Valid = {value: '', valid: true};
  password: Valid = {value: '', valid: true};;

  constructor(private userService: UserService) {
  }

  async tryLogin() {
    var user = {email: '', username: this.username, password: this.userService.hash(this.password.value)}
  }

  switchForms() {
    this.switchForm.emit();
  }
}
