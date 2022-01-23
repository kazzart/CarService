import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToRowComponent } from './to-row.component';

describe('ToRowComponent', () => {
  let component: ToRowComponent;
  let fixture: ComponentFixture<ToRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
