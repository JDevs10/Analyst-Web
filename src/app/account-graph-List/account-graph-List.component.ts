import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { OperationServiceService } from '../service/operation-service.service';
import { EncrDecrService } from '../service/encr-decr.service';
import { DateServiceService } from '../service/date-service.service';

@Component({
  selector: 'app-account-graph-List',
  templateUrl: './account-graph-List.component.html',
  styleUrls: ['./account-graph-List.component.css']
})
export class AccountGraphListComponent implements OnInit {

  chart: Chart;
  categoryArrayObj = [];
  categoryArray = [];
  operationDataObj = [];
  operationData_recent = [];
  operationData_old = [];

  constructor(public operationService: OperationServiceService,
              public encrDecrService: EncrDecrService,
              private dateService: DateServiceService) { }

  ngOnInit() {

    this.operationService.getAllCategories().snapshotChanges().subscribe(List => {
      this.categoryArrayObj = List.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      this.categoryArray = this.getCategoryArray(this.categoryArrayObj);
    });

    this.operationService.getOperations().subscribe(List => {
      this.operationDataObj = List.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });

      const d = new Date();
      this.operationData_recent = this.getOperationDataArray(this.categoryArray, this.operationDataObj, d.getFullYear());
      this.operationData_old = this.getOperationDataArray(this.categoryArray, this.operationDataObj, (d.getFullYear() - 1));
      this.loadChart(this.categoryArray, d.getFullYear(), this.operationData_recent, (d.getFullYear() - 1), this.operationData_old);
    });

    this.loadChart(new Array(), '', new Array(), '', new Array());
  }

  getCategoryArray(arrayObj) {
    const catArray = new Array();
    for (let x = 0; x < arrayObj.length; x++) {
      catArray[x] = arrayObj[x].Name;
    }
    return catArray;
  }

  getOperationDataArray(arrayCat, arrayData, year) {
    const dataArray = new Array();
    for ( let x = 0; x < arrayCat.length; x++) {
      let value = 0;

      for ( let y = 0; y < arrayData.length; y++) {
        if (arrayCat[x] == this.encrDecrService.decrypt(arrayData[y].Category)) {

          if ('' + this.dateService.getCurrentDateYear(this.encrDecrService.decrypt(arrayData[y].Date)) == year) {
            if (this.encrDecrService.decrypt(arrayData[y].TypeSymbol) == '+') {
              value += parseFloat(this.encrDecrService.decrypt(arrayData[y].Value));

            } else if (this.encrDecrService.decrypt(arrayData[y].TypeSymbol) == '-') {
              value -= parseFloat(this.encrDecrService.decrypt(arrayData[y].Value));
            }
            dataArray[x] = value;
          }
        }
        /*
       if (arrayCat[x] == arrayData[y].Category) {
        dataArray[x] += arrayData[y].Value;
        }
        */
      }
    }
    return dataArray;
  }

  loadChart(categoryArray, recentLabel, operationData_recent, oldLabel, operationData_old) {
    this.chart = new Chart('canvas', {
      type: 'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data: {
        labels: categoryArray,
        datasets: [{
          label: '' + recentLabel,
          data: operationData_recent,
           backgroundColor: 'rgb(35, 159, 219)',
          /*
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)'
          ],
          */
          borderWidth: 1,
          borderColor: '#777',
          hoverBorderWidth: 3,
          hoverBorderColor: '#000'
        },
        {
          label: '' + oldLabel,
          data: operationData_old,
          backgroundColor: 'rgb(11, 94, 205)',
          /*
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)'
          ],
          */
          borderWidth: 1,
          borderColor: '#777',
          hoverBorderWidth: 3,
          hoverBorderColor: '#000'
        }]
      },
      options: {
        title: {
          display: true,
          text: 'My Account Value of each Category',
          fontSize: 23
        },
        legend: {
          display: true,
          position: 'right',
          labels: {
            fontColor: '#000'
          }
        },
        layout: {
          padding: {
            left: 50,
            right: 0,
            bottom: 0,
            top: 0
          }
        },
        tooltips: {
          enabled: true
        }
      }
    });
  }

}
