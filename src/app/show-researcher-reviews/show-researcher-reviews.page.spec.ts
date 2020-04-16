import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowResearcherReviewsPage } from './show-researcher-reviews.page';

describe('ShowResearcherReviewsPage', () => {
  let component: ShowResearcherReviewsPage;
  let fixture: ComponentFixture<ShowResearcherReviewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowResearcherReviewsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowResearcherReviewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
