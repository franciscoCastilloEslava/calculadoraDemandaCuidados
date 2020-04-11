import { Component } from '@angular/core';

// import { FormBuilder, FormGroup, FormControl, Validators, RequiredValidator } from '@angular/forms';
// interface Scale {
//   label: string;
//   value: string;
// }
// interface Territory {
//   label: string;
//   value: string;
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // optionsScale: Scale[];
  // optionsTerritory: Territory[];

  // form: FormGroup;
  // sacaleField: FormControl;
  // territoryField: FormControl;

  constructor(
    // private formBuilder: FormBuilder
  ) {
    // this.buildForm();
    // this.setformValidators()
    // this.sacaleField = new FormControl();
    // this.sacaleField.valueChanges
    //   .subscribe( data => {
    //     console.log( data );
    //   });

    // this.optionsScale = [
    //   {
    //     label: 'Personal',
    //     value: 'per'
    //   }, {
    //     label: 'Madrid 1',
    //     value: 'mad1'
    //   }, {
    //     label: 'Madrid 2',
    //     value: 'mad2'
    //   }
    // ];

    // this.optionsTerritory = [
    //   {
    //     label: 'Personal',
    //     value: 'per'
    //   },{
    //     label: 'España',
    //     value: 'and'
    //   }, {
    //     label: 'Andalucía',
    //     value: 'and'
    //   }, {
    //     label: 'El Sur',
    //     value: 'and'
    //   }
    // ];
  }

  // buildForm() {
  //   this.form = this.formBuilder.group({
  //     scale: [null, [Validators.required]],
  //     scaleRango0: '',
  //     territory: [null, [Validators.required]]
  //   });
  // }

  // submitForm( e: any ) {
  //   e.preventDefault();
  //   console.log('DATA =>', this.form.value);
  // }

  // print(e){
  //   console.log('DATA =>', e);
  // }

  // setformValidators() {
  //   const scaleRango0 = this.form.get('scaleRango0');
  //   this.form.get('scale').valueChanges
  //     .subscribe( typeScale => {
  //       if (typeScale && typeScale.value === 'per') {
  //         scaleRango0.setValidators([Validators.required]);
  //       } else {
  //         scaleRango0.setValidators(null);
  //       }
  //     });
  // }
}
