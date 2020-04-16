import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeVerificationPage } from './make-verification.page';

describe('MakeVerificationPage', () => {
  let component: MakeVerificationPage;
  let fixture: ComponentFixture<MakeVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeVerificationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
