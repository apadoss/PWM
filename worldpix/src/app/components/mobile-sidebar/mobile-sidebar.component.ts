import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-mobile-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './mobile-sidebar.component.html',
  styleUrl: './mobile-sidebar.component.css'
})
export class MobileSidebarComponent {
  @Input() activeTab: string = "home";
  @Output() clickTab: EventEmitter<any> = new EventEmitter();
}
