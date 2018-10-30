import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSectionProfilepageComponent } from './main-section-profilepage.component';

describe('MainSectionProfilepageComponent', () => {
  let component: MainSectionProfilepageComponent;
  let fixture: ComponentFixture<MainSectionProfilepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainSectionProfilepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSectionProfilepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
