import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingMainPage } from './booking-main.page';

describe('BookingMainPage', () => {
  let component: BookingMainPage;
  let fixture: ComponentFixture<BookingMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingMainPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
