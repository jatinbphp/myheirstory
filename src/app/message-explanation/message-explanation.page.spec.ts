import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageExplanationPage } from './message-explanation.page';

describe('MessageExplanationPage', () => {
  let component: MessageExplanationPage;
  let fixture: ComponentFixture<MessageExplanationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageExplanationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageExplanationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
