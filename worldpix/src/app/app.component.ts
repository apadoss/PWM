import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule

import { TransparentButtonComponent } from './components/buttons/transparent-button/transparent-button.component';
import { GenericButtonComponent } from './components/buttons/generic-button/generic-button.component';
import { SidebarButtonComponent } from './components/buttons/sidebar-button/sidebar-button.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { Generic2ButtonComponent } from './components/buttons/generic2-button/generic2-button.component';
import { MobileSidebarComponent } from './components/mobile-sidebar/mobile-sidebar.component';
import { FinalSidebarComponent } from './components/final-sidebar/final-sidebar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TransparentButtonComponent, 
    GenericButtonComponent, SidebarButtonComponent, 
    SidebarComponent, LoginFormComponent, 
    Generic2ButtonComponent, MobileSidebarComponent,
    FinalSidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'worldpix';
}
