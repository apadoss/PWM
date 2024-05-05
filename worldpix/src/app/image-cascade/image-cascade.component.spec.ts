import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCascadeComponent } from './image-cascade.component';

describe('ImageCascadeComponent', () => {
  let component: ImageCascadeComponent;
  let fixture: ComponentFixture<ImageCascadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageCascadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageCascadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
