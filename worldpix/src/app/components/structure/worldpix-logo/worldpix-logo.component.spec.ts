import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldpixLogoComponent } from './worldpix-logo.component';

describe('WorldpixLogoComponent', () => {
  let component: WorldpixLogoComponent;
  let fixture: ComponentFixture<WorldpixLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorldpixLogoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorldpixLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
