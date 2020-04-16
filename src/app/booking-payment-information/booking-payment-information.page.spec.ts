import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPaymentInformationPage } from './booking-payment-information.page';

describe('BookingPaymentInformationPage', () => {
  let component: BookingPaymentInformationPage;
  let fixture: ComponentFixture<BookingPaymentInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingPaymentInformationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingPaymentInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
