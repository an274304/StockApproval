import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorNavBarComponent } from './director-nav-bar.component';

describe('DirectorNavBarComponent', () => {
  let component: DirectorNavBarComponent;
  let fixture: ComponentFixture<DirectorNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectorNavBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
