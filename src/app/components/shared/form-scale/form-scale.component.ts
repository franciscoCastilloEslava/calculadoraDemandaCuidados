import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { PopulationsService } from './../../../core/services/population/populations.service';

import { MenuItem } from 'primeng/api';

interface Scale {
  label: string;
  code: string;
}

@Component({
  selector: 'app-form-scale',
  templateUrl: './form-scale.component.html',
  styleUrls: ['./form-scale.component.scss']
})
export class FormScaleComponent implements OnInit, OnChanges {
  @Input() scaleDisable: any;
  @Output() submitFormScale: EventEmitter<any> = new EventEmitter();
  items: MenuItem[];

  optionsScale: Scale[];

  form: FormGroup;

  isShow: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private populationsService: PopulationsService
  ) {
    this.optionsScale = [];
    const listScale = this.populationsService.getAllScale();
    // tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < listScale.length; x++) {
      this.optionsScale.push(listScale[x]);
    }
    this.buildForm();
  }

  ngOnInit() {
    this.isShow = true;
    this.form.disable();
    this.form.controls.scale.enable();
  }

  ngOnChanges() {
    debugger;
    if ( this.scaleDisable ) {
      this.isShow = true;
      this.buildForm();
    }
  }

  buildForm() {
    this.form = this.formBuilder.group({
      scale: [null, [Validators.required]],
      scaleRango0: '',
      scaleRango5: '',
      scaleRango15: '',
      scaleRango65: '',
      scaleRango80: ''
    });
  }

  changeValue( event: any ) {
    const dataSelected = event.value;
    if (dataSelected && dataSelected.code === 'PER') {
      this.form.enable();
      this.setRequerid(dataSelected.code);
    } else if (dataSelected && dataSelected.code !== 'PER') {
      this.form.disable();
      this.form.controls.scale.enable();
      const scaleSelected = this.searchScale(dataSelected.code);
      this.setValueForm(scaleSelected.data);
      this.setRequerid(dataSelected.code);
    } else {
      this.formClear();
    }
  }

  searchScale( typeScale: string ) {
    return this.populationsService.getScale(typeScale);
  }

  setValueForm(valueForm: any) {
    this.form.patchValue({
      scaleRango0: valueForm.scale0,
      scaleRango5: valueForm.scale5,
      scaleRango15: valueForm.scale15,
      scaleRango65: valueForm.scale65,
      scaleRango80: valueForm.scale80
    });
  }

  setRequerid( typeScale: string ) {
    const scaleRango0 = this.form.get('scaleRango0');
    const scaleRango5 = this.form.get('scaleRango5');
    const scaleRango15 = this.form.get('scaleRango15');
    const scaleRango65 = this.form.get('scaleRango65');
    const scaleRango80 = this.form.get('scaleRango80');

    if (typeScale === 'PER') {
      scaleRango0.setValidators([Validators.required]);
      scaleRango5.setValidators([Validators.required]);
      scaleRango15.setValidators([Validators.required]);
      scaleRango65.setValidators([Validators.required]);
      scaleRango80.setValidators([Validators.required]);
    } else {
      scaleRango0.setValidators(null);
      scaleRango5.setValidators(null);
      scaleRango15.setValidators(null);
      scaleRango65.setValidators(null);
      scaleRango80.setValidators(null);
    }
  }

  formClear() {
    this.form.reset();
  }

  submitForm( e: any ) {
    e.preventDefault();
    this.form.disable();
    this.isShow = false;
    this.submitFormScale.emit(this.form);
  }
}
