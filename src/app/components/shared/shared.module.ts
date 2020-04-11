import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PrimeModule } from './../prime/prime.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormComponent } from './form/form.component';
import { FormScaleComponent } from './form-scale/form-scale.component';
import { FormTerritoryComponent } from './form-territory/form-territory.component';
import { FormYearComponent } from './form-year/form-year.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FormComponent,
    FormScaleComponent,
    FormTerritoryComponent,
    FormYearComponent
  ],
  imports: [
    CommonModule,
    PrimeModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FormComponent,
    FormScaleComponent,
    FormTerritoryComponent,
    FormYearComponent
  ]
})
export class SharesModule { }
