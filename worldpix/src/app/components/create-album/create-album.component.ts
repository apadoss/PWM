import { Component, EventEmitter, Output } from '@angular/core';
import { Generic2ButtonComponent } from "../buttons/generic2-button/generic2-button.component";
import { IconRoundButtonComponent } from "../buttons/icon-round-button/icon-round-button.component";
import { Valid } from '@app/interfaces/valid';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-create-album',
    standalone: true,
    templateUrl: './create-album.component.html',
    styleUrl: './create-album.component.css',
    imports: [Generic2ButtonComponent, IconRoundButtonComponent, FormsModule]
})
export class CreateAlbumComponent {
  @Output() closed: EventEmitter<any> = new EventEmitter();
  @Output() created: EventEmitter<any> = new EventEmitter();

  name: Valid = {value: '', valid: true};
  description: Valid = {value: '', valid: true};
  dateStart: Valid = {value: new Date, valid: true};
  dateEnd: Valid = {value: new Date, valid: true};
  city: Valid = {value: '', valid: true};
  latitude: Valid = {value: 0, valid: true};
  longitude: Valid = {value: 0, valid: true};


  return() {
    this.closed.emit();
  }
}
