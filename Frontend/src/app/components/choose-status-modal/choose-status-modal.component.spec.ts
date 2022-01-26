import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseStatusModalComponent } from './choose-status-modal.component';

describe('ChooseStatusModalComponent', () => {
  let component: ChooseStatusModalComponent;
  let fixture: ComponentFixture<ChooseStatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseStatusModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
