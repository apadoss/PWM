import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorldpixFooterComponent } from './worldpix-footer/worldpix-footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WorldpixFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'worldpix';
}
