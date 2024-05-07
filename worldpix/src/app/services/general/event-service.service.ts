import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EventService {
  private albumCard = new Subject<string>();
  albumDeleted$ = this.albumCard.asObservable();
  event$ = this.albumCard.asObservable();

  albumDeleted(deleted: string) {
    this.albumCard.next(deleted);
  }
}
