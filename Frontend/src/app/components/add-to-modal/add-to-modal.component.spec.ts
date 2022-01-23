import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToModalComponent } from './add-to-modal.component';

describe('AddToModalComponent', () => {
  let component: AddToModalComponent;
  let fixture: ComponentFixture<AddToModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
