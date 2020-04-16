import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSearchDnaresultPage } from './home-search-dnaresult.page';

describe('HomeSearchDnaresultPage', () => {
  let component: HomeSearchDnaresultPage;
  let fixture: ComponentFixture<HomeSearchDnaresultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSearchDnaresultPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSearchDnaresultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
