import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentInformationPage } from './payment-information.page';

describe('PaymentInformationPage', () => {
  let component: PaymentInformationPage;
  let fixture: ComponentFixture<PaymentInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentInformationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
