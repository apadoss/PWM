import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-under-construction',
  standalone: true,
  imports: [],
  templateUrl: './under-construction.component.html',
  styleUrl: './under-construction.component.css'
})
export class UnderConstructionComponent {

  constructor(private router: Router) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.router.navigateByUrl("home");
    }, 5000);
  }
}
