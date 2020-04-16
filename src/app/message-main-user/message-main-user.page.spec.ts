import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageMainUserPage } from './message-main-user.page';

describe('MessageMainUserPage', () => {
  let component: MessageMainUserPage;
  let fixture: ComponentFixture<MessageMainUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageMainUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageMainUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
