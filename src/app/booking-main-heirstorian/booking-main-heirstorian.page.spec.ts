import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingMainHeirstorianPage } from './booking-main-heirstorian.page';

describe('BookingMainHeirstorianPage', () => {
  let component: BookingMainHeirstorianPage;
  let fixture: ComponentFixture<BookingMainHeirstorianPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingMainHeirstorianPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingMainHeirstorianPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
