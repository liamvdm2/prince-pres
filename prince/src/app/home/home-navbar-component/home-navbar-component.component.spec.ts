import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNavbarComponentComponent } from './home-navbar-component.component';

describe('HomeNavbarComponentComponent', () => {
  let component: HomeNavbarComponentComponent;
  let fixture: ComponentFixture<HomeNavbarComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeNavbarComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeNavbarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
