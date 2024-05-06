import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-city-list',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.css'
})
export class CityListComponent {
  @Input()
  options: [] = [];
  @Output() citySelected: EventEmitter<any> = new EventEmitter();

  clicked(city: {}) {
    this.citySelected.emit(city);
  }
}
