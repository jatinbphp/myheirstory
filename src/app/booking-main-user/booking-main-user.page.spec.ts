import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingMainUserPage } from './booking-main-user.page';

describe('BookingMainUserPage', () => {
  let component: BookingMainUserPage;
  let fixture: ComponentFixture<BookingMainUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingMainUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingMainUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
