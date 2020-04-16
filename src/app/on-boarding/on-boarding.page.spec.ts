import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBoardingPage } from './on-boarding.page';

describe('OnBoardingPage', () => {
  let component: OnBoardingPage;
  let fixture: ComponentFixture<OnBoardingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnBoardingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnBoardingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
