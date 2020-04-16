import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHeirstorianPage } from './show-heirstorian.page';

describe('ShowHeirstorianPage', () => {
  let component: ShowHeirstorianPage;
  let fixture: ComponentFixture<ShowHeirstorianPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowHeirstorianPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHeirstorianPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
