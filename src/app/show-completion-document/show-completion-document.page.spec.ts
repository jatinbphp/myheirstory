import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCompletionDocumentPage } from './show-completion-document.page';

describe('ShowCompletionDocumentPage', () => {
  let component: ShowCompletionDocumentPage;
  let fixture: ComponentFixture<ShowCompletionDocumentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCompletionDocumentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCompletionDocumentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
