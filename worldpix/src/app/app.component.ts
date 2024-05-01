import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransparentButtonComponent } from './components/buttons/transparent-button/transparent-button.component';
import { GenericButtonComponent } from './components/buttons/generic-button/generic-button.component';
import { SidebarButtonComponent } from './components/buttons/sidebar-button/sidebar-button.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TransparentButtonComponent, GenericButtonComponent, SidebarButtonComponent, SidebarComponent, LoginFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'worldpix';
}
