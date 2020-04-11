import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { PopulationsService } from './../../../core/services/population/populations.service';

import { MenuItem } from 'primeng/api';

interface Year {
  label: string;
  value: number;
}

@Component({
  selector: 'app-form-year',
  templateUrl: './form-year.component.html',
  styleUrls: ['./form-year.component.scss']
})
export class FormYearComponent implements OnInit, OnChanges {
  @Input() yearDisable: any;
  @Output() submitFormYear: EventEmitter<any> = new EventEmitter();
  items: MenuItem[];

  optionsYear: Year[];

  form: FormGroup;
  selectedYears: Year[];

  isShow: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private populationsService: PopulationsService
  ) {
    this.isShow = true;
    this.optionsYear = [];
    const listYear = this.populationsService.getYears();
    // tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < listYear.length; x++) {
      this.optionsYear.push(listYear[x]);
    }
    this.buildForm();
  }

  ngOnInit() { }

  ngOnChanges() {
    debugger;
    if ( this.yearDisable ) {
      this.isShow = true;
    }
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      year: [[], [Validators.required]],
    });
  }

  submitForm(e: any) {
    e.preventDefault();
    this.form.disable();
    this.isShow = false;
    this.submitFormYear.emit(
      {
        form: this.form,
        years: this.form.value.year,
      }
    );
  }
}
