import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalSidebarComponent } from './final-sidebar.component';

describe('FinalSidebarComponent', () => {
  let component: FinalSidebarComponent;
  let fixture: ComponentFixture<FinalSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinalSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
