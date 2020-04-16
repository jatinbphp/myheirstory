import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerMessageThreadPage } from './answer-message-thread.page';

describe('AnswerMessageThreadPage', () => {
  let component: AnswerMessageThreadPage;
  let fixture: ComponentFixture<AnswerMessageThreadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerMessageThreadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerMessageThreadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
