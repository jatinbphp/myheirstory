import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMessageThreadPage } from './show-message-thread.page';

describe('ShowMessageThreadPage', () => {
  let component: ShowMessageThreadPage;
  let fixture: ComponentFixture<ShowMessageThreadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMessageThreadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMessageThreadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
