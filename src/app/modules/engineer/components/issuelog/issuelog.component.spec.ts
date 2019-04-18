import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuelogComponent } from './issuelog.component';

describe('IssuelogComponent', () => {
  let component: IssuelogComponent;
  let fixture: ComponentFixture<IssuelogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuelogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
