import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowResearcherSpecialityPage } from './show-researcher-speciality.page';

describe('ShowResearcherSpecialityPage', () => {
  let component: ShowResearcherSpecialityPage;
  let fixture: ComponentFixture<ShowResearcherSpecialityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowResearcherSpecialityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowResearcherSpecialityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
