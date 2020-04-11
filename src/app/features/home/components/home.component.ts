import { LayoutComponent } from './../../../layout/components/layout.component';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import {SelectItem} from 'primeng/api';

import { PopulationsService } from './../../../core/services/population/populations.service';

interface Year {
  name: any;
  code: any;
}

@Component({
  selector: 'app-components',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: MenuItem[];

  /* General */
  activeIndex: any = 0;
  isTable: boolean;

  /* Form */
  scaleForm: any;
  scaleValue: any;
  scaleDisable: any;

  territoryForm: any;
  territoryValue: any;
  territoryLabel: any[];
  territoryDisable: any;

  yearForm: any;
  yearValue: any;
  yearDisable: any;


  headerTable: any;
  tableHeaderYear: any[];
  tableHeaderData: any[];
  tableBody: any[];


  isDisabled = false;

  formAll: any;

  responPopulation: any;
  datosAll: any[];


  arrEnd: any[];

  years: SelectItem[];
  optionsYears: SelectItem[];
  selectedYears: Year[];

  /* Table - header */
  headerYear: any[] = [];
  headerTitle: any[] = [];

  /* Chars */
  dataBara: any;
  optionsBara: any;
  dataLine: any;
  dataRadar: any;
  color: string[];

  dataForYearAndTerritoryTest: any[];

  constructor(
    private populationsService: PopulationsService
  ) {
    this.isTable = false;
    this.datosAll = [];
    this.items = [
      {label: 'Formulario Escala'},
      {label: 'Formulario Territorio'},
      {label: 'Formulario Fecha'}
    ];
    this.arrEnd = [];
    this.territoryLabel = [];
    this.headerTable = {};
    this.optionsBara = {};

    this.color = [
      '#36A2EB',
      '#4BC0C0',
      '#7A219C',
      '#E3C51D',
      '#9C4421',
      '#9C216A',
      '#989C21',
      '#6F95C0',
      '#5D9C21',
      '#C06F70'
    ];

    this.scaleDisable = false;
    this.territoryDisable = false;
    this.yearDisable = false;
  }

  ngOnInit() { }

  handlerFormScale( form ) {
    this.scaleForm = form;
    this.scaleValue = form.value.scale.code;
    this.activeIndex = 1;
    this.scaleDisable = false;
  }

  handlerFormTerritory( data ) {
    this.territoryLabel = [];
    this.territoryForm = data.form;
    this.territoryValue = data.years;
    for( let x = 0; x < this.territoryValue.length; x++) {
      this.territoryLabel.push(this.territoryValue[x].territorio);
    }
    this.activeIndex = 2;
    this.territoryDisable = false;
  }

  handlerFormYear(data) {
    this.yearForm = data.form;
    this.yearValue = data.form.value.year;
    this.initProgram();
    this.yearDisable = false
  }

  initProgram() {
    this.createTable();
  }

  createTable() {
    const dataForYears = this.getDataForYears();
    console.log(dataForYears);

    const dataTest = this.getDataTest(dataForYears);
    console.log(dataTest);

    const arrAll = this.getDataAll(dataTest);
    console.log(arrAll);
    this.tableBody = arrAll;

    this.headerTable = this.getheaderTable();
    console.log(this.headerTable);

    this.createCharts(dataTest);

    this.isTable = true;
  }

  getDataForYears() {
    const scale = this.scaleForm.value;
    const territory = this.territoryValue;
    const years = this.yearValue;
    let arrData  = [];
    let arrDataRango  = [];
    let arrDataYear  = [];
    let count = 0;

    territory.forEach( territoryItem => {

      territoryItem.data.forEach( itemRango => {
        // tslint:disable-next-line: forin
        for (const prop in itemRango.population) {

          // tslint:disable-next-line: prefer-for-of
          for ( let x = 0; x < this.yearValue.length; x++ ) {

            if (parseInt(prop) === this.yearValue[x]) {
              arrDataYear.push(itemRango.population[this.yearValue[x]]);
            }
          }
        }
        arrDataRango.push(
          {
            rango: itemRango.rango,
            value: itemRango.value,
            population: arrDataYear
          }
        );
        arrDataYear = [];
      });
      arrData.push(
        {
          territorio: territory[count].territorio,
          territorioKey: territory[count].territorioKey,
          data: arrDataRango
        }
      );
      count++;
      arrDataRango = [];
    });
    return arrData;
  }

  getDataTest( data ) {
    let arrData = [];
    let arrDataAuxA = [];
    let arrDataAuxB = [];
    let arrDataAuxC = [];
    let totalAll = 1;
    let countScale = 0;
    let yearAll = this.yearValue;
    let scaleAll = this.scaleForm.value;

    data.forEach( territoryItem => {
      for ( let x = 0; x < yearAll.length; x++ ) {
        territoryItem.data.forEach( itemRango => {
        // tslint:disable-next-line: prefer-for-of
          if ( itemRango.rango === 0 ) {
              totalAll = itemRango.population[x];
          } else if (itemRango.rango !== 0) {
            const scaleCalculate = this.setScale(scaleAll, itemRango.rango);
            for ( let z = 0; z < 4; z++) {
              if ( z === 0 ) {
                arrDataAuxC.push(
                  // (itemRango.population[x] )
                  (itemRango.population[x] ) / 1000
                );
              } else if ( z === 1 ) {
                arrDataAuxC.push(
                  this.decimalAdjust('round', (itemRango.population[x] * 100) / totalAll , -1)
                );
                 // this.decimalAdjust('round', (itemRango.population[x] * 100) / totalAll , -1)
              } else if ( z === 2 ) {
                arrDataAuxC.push(
                  // (itemRango.population[x] * scaleCalculate)
                  (itemRango.population[x] * scaleCalculate) / 1000
                );
                countScale += itemRango.population[x] * scaleCalculate;
              } else if ( z === 3 ) {
                arrDataAuxC.push(
                  ((itemRango.population[x] * scaleCalculate) * 100) / totalAll
                );
                arrDataAuxB.push(arrDataAuxC);
                arrDataAuxC = [];
              }
            }
            if (itemRango.rango === 80) {
              for ( let x = 0; x < arrDataAuxB.length; x++ ) {
                arrDataAuxB[x][3] = this.decimalAdjust('round', (arrDataAuxB[x][2] * 100000) / countScale , -1);
              }
              arrDataAuxB.push([(totalAll / 1000), 100, countScale, 100]);
              countScale = 0;
            }
          }
        });
        arrData.push(
          {
            territorio: territoryItem.territorio,
            year: yearAll[x],
            data: arrDataAuxB
          }
        );
        arrDataAuxB = [];
        arrDataAuxC = [];
      }
    });
    return arrData;
  }

  getDataAll( data ) {
    let arr0 = [];
    let arr1 = [];
    let arr5 = [];
    let arr15 = [];
    let arr65 = [];
    let arr80 = [];

    const RagngoLength = 6;
    const territoryLength = this.territoryValue.length;
    const yearLength = this.yearValue.length;

    const countA = territoryLength * yearLength * RagngoLength;
    const countB = territoryLength * yearLength;

    let count = 0;
    for ( let x = 0; x < 4; x++) {
    // for ( let x = 0; x < countA; x++) {
      for ( let z = 0; z < RagngoLength; z++) {
        for ( let y = 0; y < countB; y++) {
          if ( z === 0 ) {
            arr1.push(data[y].data[z][count]);
          } else if ( z === 1 ) {
            arr5.push(data[y].data[z][count]);
          }  else if ( z === 2 ) {
            arr15.push(data[y].data[z][count]);
          }  else if ( z === 3 ) {
            arr65.push(data[y].data[z][count]);
          }  else if ( z === 4 ) {
            arr80.push(data[y].data[z][count]);
          } else if ( z === 5 ) {
            arr0.push(data[y].data[z][count]);
          }
        }
      }
      count++;
      if (count === 4) {
        count = 0;
      }
    }
    return ([ arr0, arr1, arr5, arr15, arr65, arr80]);
  }

  setScale(scale, rango) {
    let scaleCalculate = 1;
    switch (rango) {
      case 1:
        scaleCalculate = scale.scaleRango0;
        break;
      case 5:
        scaleCalculate = scale.scaleRango5;
        break;
      case 15:
        scaleCalculate = scale.scaleRango15;
        break;
      case 65:
        scaleCalculate = scale.scaleRango65;
        break;
      case 80:
        scaleCalculate = scale.scaleRango80;
        break;
    }
    return scaleCalculate;
  }

  getheaderTable( ) {
    let header = {};
    let arrHeaderYearTerritory = [];
    let arrHeaderTitle = [];
    let countYear = 0;
    let countTerritory = 0;
    const datosLength = 4;
    const territoryLength = this.territoryValue.length;
    const yearLength = this.yearValue.length;
    const arrTitle = [
      'Población (miles)',
      'Población (%)',
      'Unidades de cuidado (miles)',
      'Unidades de cuidado (%)'
    ];

    const repeat = territoryLength * yearLength;

    const yearAll = this.yearValue;
    const territoryLabel = this.territoryLabel;
    for ( let x = 0; x < datosLength; x++) {
      for ( let z = 0; z < repeat; z++) {
        arrHeaderYearTerritory.push(territoryLabel[countTerritory] + ' ' + yearAll[countYear]);
        arrHeaderTitle.push(arrTitle[x]);
        countTerritory++;
        if (z === 1) {
          countTerritory = 0;
        }
        if (z === 1) {
          countYear++;
        }
      }
      countTerritory = 0;
      countYear = 0;
    }
    return (
      {
        year: arrHeaderYearTerritory,
        title: arrHeaderTitle
      }
    );
  }

  createCharts(data  ) {
    this.setChartBara( data );
    this.setChartLine( data );
    this.setChartRadar( data );
  }

  setChartBara( data ) {
    let arrChart = [];
    let arrChartAux = [];
    let count = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < data.length; x++) {
      for (let z = 0; z < data[x].data.length; z++) {
        arrChartAux.push(data[x].data[z][3]);
      }
      arrChartAux[5] = 0;
      count++;
      arrChart.push(
        {
          label: data[x].territorio + ' - ' + data[x].year,
          backgroundColor: this.color[count],
          data: arrChartAux
        }
      );

      if (count === 10) {
        count = 0;
      }
      arrChartAux = [];
    }

    this.dataBara = {
      labels: ['0-4', '5-14', '15-64', '65-80', '+80', 'Rangos'],
      datasets: arrChart
    };

    this.optionsBara = {
      scale: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 50,
          stepSize: 1
        }
      }
    };
  }

  setChartLine( data ) {
    let arrChart = [];
    let arrChartAux = [];
    let count = 0;

    // tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < data.length; x++) {
      for (let z = 0; z < data[x].data.length; z++) {
        arrChartAux.push(data[x].data[z][3]);
      }
      arrChartAux[5] = 0;
      count++;
      arrChart.push(
        {
          label: data[x].territorio + ' - ' + data[x].year,
          borderColor: this.color[count],
          fill: false,
          data: arrChartAux
        }
      );
      if (count === 10) {
        count = 0;
      }
      arrChartAux = [];
    }
    this.dataLine = {
      labels: ['0-4', '5-14', '15-64', '65-80', '+80'],
      datasets: arrChart
    };
  }

  setChartRadar( data ) {
    let arrChart = [];
    let arrChartAux = [];
    let count = 0;

    // tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < data.length; x++) {
      for (let z = 0; z < data[x].data.length; z++) {
        arrChartAux.push(data[x].data[z][3]);
      }
      arrChartAux.pop();
      arrChart.push(
        {
          label: data[x].territorio + ' - ' + data[x].year,
          backgroundColor: 'transparent',
          borderColor: this.color[count],
          pointBackgroundColor: this.color[count],
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: this.color[count],
          data: arrChartAux
        }
      );
      count ++;
      arrChartAux = [];
    }

    this.dataRadar = {
      labels: ['0-4', '5-14', '15-64', '65-80', '+80'],
      datasets: arrChart
    };
  }

  resetForm() {
    this.scaleDisable = false;
    this.territoryDisable = false;
    this.yearDisable = false;

    debugger;
    this.isTable = false;
    this.activeIndex = 0;

    this.scaleForm.enable();
    this.scaleForm.reset();
    this.scaleDisable = true;

    this.territoryForm.enable();
    this.territoryForm.reset();
    this.territoryDisable = true;

    this.yearForm.enable();
    this.yearForm.reset();
    this.yearDisable = true;
  }

  /* UTILS */
  decimalAdjust(type, value, exp) {
    // Si el exp no está definido o es cero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Si el valor no es un número o el exp no es un entero...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  compare( a, b ) {
    if ( a.code < b.code ){
      return -1;
    }
    if ( a.code > b.code ){
      return 1;
    }
    return 0;
  }

  getArrayChart(data){
    const arrAll = Object.values(data);
    const remove = arrAll.splice(0, 2);
    return arrAll;
  }

  getColorChart(length) {
    let arrColor = [];
    let count = 0;

    for (let x = 0; x < length; x++) {
      arrColor.push(this.color[x]);
    }

    count++;

    if (count === 5) {
      count = 0;
    }
    return arrColor;
  }
}
