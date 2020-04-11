import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormYearComponent } from './form-year.component';

describe('FormYearComponent', () => {
  let component: FormYearComponent;
  let fixture: ComponentFixture<FormYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
