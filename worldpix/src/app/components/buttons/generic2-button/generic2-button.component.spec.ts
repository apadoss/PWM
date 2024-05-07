import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Generic2ButtonComponent } from './generic2-button.component';

describe('Generic2ButtonComponent', () => {
  let component: Generic2ButtonComponent;
  let fixture: ComponentFixture<Generic2ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Generic2ButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Generic2ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
