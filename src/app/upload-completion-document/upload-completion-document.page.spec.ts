import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCompletionDocumentPage } from './upload-completion-document.page';

describe('UploadCompletionDocumentPage', () => {
  let component: UploadCompletionDocumentPage;
  let fixture: ComponentFixture<UploadCompletionDocumentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadCompletionDocumentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCompletionDocumentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
