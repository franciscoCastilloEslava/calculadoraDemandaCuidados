import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { PopulationsService } from './../../../core/services/population/populations.service';

import { MenuItem } from 'primeng/api';

interface Territory {
  label: string;
  value: string;
}

@Component({
selector: 'app-form-territory',
templateUrl: './form-territory.component.html',
styleUrls: ['./form-territory.component.scss']
})
export class FormTerritoryComponent implements OnInit, OnChanges {
  @Input() territoryDisable: any;
  @Output() submitFormTerritory: EventEmitter<any> = new EventEmitter();
  items: MenuItem[];

  optionsTerritory: Territory[];

  form: FormGroup;

  isShow: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private populationsService: PopulationsService
  ) {
    this.optionsTerritory = [];
    const listTerritory = this.populationsService.getAllTerritory();
    // tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < listTerritory.length; x++) {
      this.optionsTerritory.push(listTerritory[x]);
    }
    this.buildForm();
  }

  ngOnInit() {
    this.isShow = true;
    this.form.disable();
    this.form.controls.territory.enable();
  }

  ngOnChanges() {
    debugger;
    if ( this.territoryDisable ) {
      this.isShow = true;
    }
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      territory: [[], [Validators.required]],
      territoryRango0: '',
      territoryRango5: '',
      territoryRango15: '',
      territoryRango65: '',
      territoryRango80: ''
    });
  }

  changeValue( event: any ) {
    const dataSelected = event.value;
    if (dataSelected && dataSelected.code === 'PER') {
      this.form.enable();
      this.setRequerid(dataSelected.code);
    } else if (dataSelected && dataSelected.code !== 'PER') {
      this.form.disable();
      this.form.controls.territory.enable();
    } else {
      this.formClear();
    }
  }

  setValueForm(valueForm: any) {
    this.form.patchValue({
      territoryRango0: valueForm.territory0,
      territoryRango5: valueForm.territory5,
      territoryRango15: valueForm.territory15,
      territoryRango65: valueForm.territory65,
      territoryRango80: valueForm.territory80
    });
  }

  setRequerid( typeTerritory: string ) {
    const territoryRango0 = this.form.get('territoryRango0');
    const territoryRango5 = this.form.get('territoryRango5');
    const territoryRango15 = this.form.get('territoryRango15');
    const territoryRango65 = this.form.get('territoryRango65');
    const territoryRango80 = this.form.get('territoryRango80');

    if (typeTerritory === 'PER') {
      territoryRango0.setValidators([Validators.required]);
      territoryRango5.setValidators([Validators.required]);
      territoryRango15.setValidators([Validators.required]);
      territoryRango65.setValidators([Validators.required]);
      territoryRango80.setValidators([Validators.required]);
    } else {
      territoryRango0.setValidators(null);
      territoryRango5.setValidators(null);
      territoryRango15.setValidators(null);
      territoryRango65.setValidators(null);
      territoryRango80.setValidators(null);
    }
  }

  formClear() {
    this.form.reset();
  }

  submitForm( e: any ) {
    e.preventDefault();
    this.form.disable();
    this.isShow = false;
    const dataForYear = this.populationsService.getDataforYear(this.form.value.territory);
    this.submitFormTerritory.emit(
      {
        form: this.form,
        years: dataForYear
      }
    );
  }
}
