import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMainPage } from './search-main.page';

describe('SearchMainPage', () => {
  let component: SearchMainPage;
  let fixture: ComponentFixture<SearchMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMainPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
