import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesAddPage } from './services-add.page';

describe('ServicesAddPage', () => {
  let component: ServicesAddPage;
  let fixture: ComponentFixture<ServicesAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
