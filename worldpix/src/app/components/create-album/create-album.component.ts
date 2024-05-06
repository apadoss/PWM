import { Component, EventEmitter, Output } from '@angular/core';
import { Generic2ButtonComponent } from "../buttons/generic2-button/generic2-button.component";
import { IconRoundButtonComponent } from "../buttons/icon-round-button/icon-round-button.component";
import { Valid } from '@app/interfaces/valid';
import { FormsModule } from '@angular/forms';
import { AlbumService } from '@app/services/album.service';
import { UserService } from '@app/services/user.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
    selector: 'app-create-album',
    standalone: true,
    templateUrl: './create-album.component.html',
    styleUrl: './create-album.component.css',
    imports: [NgIf, CommonModule, Generic2ButtonComponent, IconRoundButtonComponent, FormsModule]
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

  constructor(private albumManager: AlbumService, private userManager: UserService) {

  }

  checkValidity(): boolean {
    let start = <HTMLInputElement>document.getElementById("startdate");
    let end = <HTMLInputElement>document.getElementById("enddate");
    let returner = false;
    /*
        returner &&= (this.name.valid = !!this.name.value);
    returner &&= (this.dateStart.valid = !!this.dateStart.value);
    returner &&= (this.dateEnd.valid = (!!this.dateEnd.value && !!this.dateStart.value && this.dateStart.value.getTime() < this.dateEnd.value.getTime()));
    returner &&= (this.city.valid = !!this.city.value);
    returner &&= (this.latitude.valid = (!!this.latitude.value && this.latitude.value >= -90.0 && this.latitude.value <= 90.0));
    returner &&= (this.longitude.valid = (!!this.longitude.value && this.longitude.value >= -90.0 && this.longitude.value <= 90.0));
*/
    this.name.valid = !!this.name.value;
    this.dateStart.value = start.valueAsDate;
    this.dateEnd.value = end.valueAsDate;
    this.dateStart.valid = !!this.dateStart.value;
    if (this.dateStart.valid) {
      this.dateEnd.valid = (this.dateEnd.value && new Date(this.dateStart.value).valueOf() < new Date(this.dateEnd.value).valueOf());
    }
    this.city.valid = !!this.city.value;
    this.latitude.valid = (!!this.latitude.value && this.latitude.value >= -90.0 && this.latitude.value <= 90.0);
    this.longitude.valid = (!!this.longitude.value && this.longitude.value >= -90.0 && this.longitude.value <= 90.0);
    returner = this.name.valid && this.dateStart.valid && this.dateEnd.valid && this.city.valid && this.latitude.valid && this.longitude.valid;
    console.log("thing", returner);
    return returner;
  }
  

  create() {
    if (this.checkValidity()) {
      let newAlbum = this.albumManager.generateAlbum(this.name.value, UserService.currentUser, '', this.dateStart.value.toISOString().slice(0, 10), this.dateEnd.value.toISOString().slice(0, 10), this.city.value, [this.latitude.value, this.longitude.value], this.description.value);
      console.log(newAlbum)
      this.created.emit(newAlbum);
    }
  }

  return() {
    this.closed.emit();
  }
}
