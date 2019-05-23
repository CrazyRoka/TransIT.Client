import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSubTableComponent } from './report-sub-table.component';

describe('ReportSubTableComponent', () => {
  let component: ReportSubTableComponent;
  let fixture: ComponentFixture<ReportSubTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSubTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSubTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
