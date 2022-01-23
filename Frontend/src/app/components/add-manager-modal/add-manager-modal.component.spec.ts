import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManagerModalComponent } from './add-manager-modal.component';

describe('AddManagerModalComponent', () => {
  let component: AddManagerModalComponent;
  let fixture: ComponentFixture<AddManagerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddManagerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddManagerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
