import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPaymentsPage } from './booking-payments.page';

describe('BookingPaymentsPage', () => {
  let component: BookingPaymentsPage;
  let fixture: ComponentFixture<BookingPaymentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingPaymentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingPaymentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
