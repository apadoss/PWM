import { Component } from '@angular/core';
import { FooterComponent } from '@app/components/structure/footer/footer.component';
import { HeaderComponent } from '@app/components/structure/header/header.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
