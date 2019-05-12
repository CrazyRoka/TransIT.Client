import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreteCountryComponent } from './crete-country.component';

describe('CreteCountryComponent', () => {
  let component: CreteCountryComponent;
  let fixture: ComponentFixture<CreteCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreteCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreteCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
