import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToViewComponent } from './to-view.component';

describe('ToViewComponent', () => {
  let component: ToViewComponent;
  let fixture: ComponentFixture<ToViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
