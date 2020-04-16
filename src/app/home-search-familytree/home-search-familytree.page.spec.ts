import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSearchFamilytreePage } from './home-search-familytree.page';

describe('HomeSearchFamilytreePage', () => {
  let component: HomeSearchFamilytreePage;
  let fixture: ComponentFixture<HomeSearchFamilytreePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSearchFamilytreePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSearchFamilytreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
