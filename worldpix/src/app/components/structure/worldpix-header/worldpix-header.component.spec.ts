import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldpixHeaderComponent } from './worldpix-header.component';

describe('WorldpixHeaderComponent', () => {
  let component: WorldpixHeaderComponent;
  let fixture: ComponentFixture<WorldpixHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorldpixHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorldpixHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
