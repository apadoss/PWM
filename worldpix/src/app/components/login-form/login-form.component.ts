import { Component, EventEmitter, Output } from '@angular/core';
import { GenericButtonComponent } from '../buttons/generic-button/generic-button.component';
import { UserService } from '../../services/user.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ GenericButtonComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})

export class LoginFormComponent {
  @Output() switchForm: EventEmitter<any> = new EventEmitter();


  constructor(private userService: UserService) {
  }

  async tryLogin() {
    console.log("click")
    var user = {email: 'a@a.com', username: 'uno', password: 'mip'}
    this.userService.registerUser(user);
    console.log(await this.userService.addUser(user));
  }

  switchForms() {
    this.switchForm.emit();
  }
}
