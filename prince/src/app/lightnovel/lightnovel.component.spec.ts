import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightnovelComponent } from './lightnovel.component';

describe('LightnovelComponent', () => {
  let component: LightnovelComponent;
  let fixture: ComponentFixture<LightnovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LightnovelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LightnovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
