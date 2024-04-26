import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorldpixHeaderComponent } from './worldpix-header/worldpix-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WorldpixHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'worldpix';
}
