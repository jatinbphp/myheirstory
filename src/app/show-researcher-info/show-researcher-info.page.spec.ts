import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowResearcherInfoPage } from './show-researcher-info.page';

describe('ShowResearcherInfoPage', () => {
  let component: ShowResearcherInfoPage;
  let fixture: ComponentFixture<ShowResearcherInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowResearcherInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowResearcherInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
