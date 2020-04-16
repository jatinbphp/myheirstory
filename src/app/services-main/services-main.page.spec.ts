import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesMainPage } from './services-main.page';

describe('ServicesMainPage', () => {
  let component: ServicesMainPage;
  let fixture: ComponentFixture<ServicesMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesMainPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
