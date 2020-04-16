import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearcherBenefitsPage } from './researcher-benefits.page';

describe('ResearcherBenefitsPage', () => {
  let component: ResearcherBenefitsPage;
  let fixture: ComponentFixture<ResearcherBenefitsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearcherBenefitsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearcherBenefitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
