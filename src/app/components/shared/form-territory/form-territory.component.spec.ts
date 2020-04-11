import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTerritoryComponent } from './form-territory.component';

describe('FormTerritoryComponent', () => {
  let component: FormTerritoryComponent;
  let fixture: ComponentFixture<FormTerritoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTerritoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTerritoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
