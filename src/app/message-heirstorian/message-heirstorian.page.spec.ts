import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageHeirstorianPage } from './message-heirstorian.page';

describe('MessageHeirstorianPage', () => {
  let component: MessageHeirstorianPage;
  let fixture: ComponentFixture<MessageHeirstorianPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageHeirstorianPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageHeirstorianPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
