import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldpixFooterComponent } from './worldpix-footer.component';

describe('WorldpixFooterComponent', () => {
  let component: WorldpixFooterComponent;
  let fixture: ComponentFixture<WorldpixFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorldpixFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorldpixFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
