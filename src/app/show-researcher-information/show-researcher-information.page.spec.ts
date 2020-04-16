import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowResearcherInformationPage } from './show-researcher-information.page';

describe('ShowResearcherInformationPage', () => {
  let component: ShowResearcherInformationPage;
  let fixture: ComponentFixture<ShowResearcherInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowResearcherInformationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowResearcherInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
