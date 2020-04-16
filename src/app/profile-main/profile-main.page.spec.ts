import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMainPage } from './profile-main.page';

describe('ProfileMainPage', () => {
  let component: ProfileMainPage;
  let fixture: ComponentFixture<ProfileMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileMainPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
