import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRatingPage } from './review-rating.page';

describe('ReviewRatingPage', () => {
  let component: ReviewRatingPage;
  let fixture: ComponentFixture<ReviewRatingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewRatingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewRatingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
