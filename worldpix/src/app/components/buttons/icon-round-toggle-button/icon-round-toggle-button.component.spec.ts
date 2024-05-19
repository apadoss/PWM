import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconRoundToggleButtonComponent } from './icon-round-toggle-button.component';

describe('IconRoundButtonComponent', () => {
  let component: IconRoundToggleButtonComponent;
  let fixture: ComponentFixture<IconRoundToggleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconRoundToggleButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IconRoundToggleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
