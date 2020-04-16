import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageMainHeirstorianPage } from './message-main-heirstorian.page';

describe('MessageMainHeirstorianPage', () => {
  let component: MessageMainHeirstorianPage;
  let fixture: ComponentFixture<MessageMainHeirstorianPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageMainHeirstorianPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageMainHeirstorianPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
