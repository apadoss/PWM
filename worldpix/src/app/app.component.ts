import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransparentButtonComponent } from './components/buttons/transparent-button/transparent-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TransparentButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'worldpix';
}
