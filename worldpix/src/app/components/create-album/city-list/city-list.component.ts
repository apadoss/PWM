import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { format } from 'util';

@Component({
  selector: 'app-city-list',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, CommonModule],
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.css'
})
export class CityListComponent {
  options: [] = [];
  @Output() citySelected: EventEmitter<any> = new EventEmitter();
  name = '';
  typingTimer: any;
  typing = -1;
  typingDelay: number = 1000;
  
  provider = new OpenStreetMapProvider({
    params: {
      limit: 3,
      format: "json",
      addressdetails: 1,
    }
  });

  onKeyUp() {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.fireEvent();
    }, this.typingDelay);
  }

  onKeyDown() {
    this.typing = 1;
    this.options = [];
    clearTimeout(this.typingTimer);
  }

  fireEvent() {
    this.fetchCities();
  }

  selected(city: any) {
    this.typing = -1;
    console.log(city)
  }

  async fetchCities() {
    this.options = <[]>await this.provider.search( {query: this.name} );
    this.typing = 0;
  }

  process(option: any) {
    let returner = option['raw']['name'] + ", "
    if (!!option['raw']['address']['province']) {
      returner += option['raw']['address']['province'] + ", ";
    } else if (!!option['raw']['address']['state']) {
      returner += option['raw']['address']['state'] + ", "
    }
    returner += option['raw']['address']['country'];
    return returner;
  }

  focusout() {
    setTimeout(() => {
        this.typing = -1;
    }, 250);
}

  async clicked(city: any) {
    this.name = this.process(city);
    this.citySelected.emit([this.name, [city['y'], city['x']]])
  }
}
