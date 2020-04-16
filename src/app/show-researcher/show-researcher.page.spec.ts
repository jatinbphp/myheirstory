import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowResearcherPage } from './show-researcher.page';

describe('ShowResearcherPage', () => {
  let component: ShowResearcherPage;
  let fixture: ComponentFixture<ShowResearcherPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowResearcherPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowResearcherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
