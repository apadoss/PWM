import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-generic2-button',
  standalone: true,
  imports: [],
  templateUrl: './generic2-button.component.html',
  styleUrl: './generic2-button.component.css'
})
export class Generic2ButtonComponent implements OnInit{
  @Input() label: string = ' ';
  constructor(){}
  ngOnInit(): void {
  }
  clickAddTodo() {
    //alert('button pressed');
  }
}