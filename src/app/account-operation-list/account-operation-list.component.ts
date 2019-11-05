import { Component, OnInit } from '@angular/core';
import { EncrDecrService } from '../service/encr-decr.service';
import { OperationServiceService } from '../service/operation-service.service';
import { DateServiceService } from '../service/date-service.service';

@Component({
  selector: 'app-account-operation-list',
  templateUrl: './account-operation-list.component.html',
  styleUrls: ['./account-operation-list.component.css']
})
export class AccountOperationListComponent implements OnInit {

  constructor(public operationService: OperationServiceService,
              public encrDecrService: EncrDecrService,
              private dateService: DateServiceService) { }

  searchText = '';
  firstSync = true;
  viewOperation = true;
  accountOperationArray = [];

  ngOnInit() {
    if (this.firstSync) {
      this.firstSyncReload();
      this.firstSync = false;
    }
    document.getElementById('Sync').addEventListener('click', (b) => {
      // this.getWindownScreenSize();
      this.operationService.getOperations().subscribe(
        List => {
          this.accountOperationArray = List.map(item => {
            return{
              $key: item.key,
              ...item.payload.val()
            };
          });
          this.getAccountTotalValue(this.accountOperationArray);
        });
      this.notification('Reload Successfully !');
      });
  }

  // Add Sync to Sync current account and window size
  firstSyncReload() {
    // this.getWindownScreenSize();
    this.operationService.getOperations().subscribe(List => {
      this.accountOperationArray = List.map(item => {
        return{
          $key: item.key,
          ...item.payload.val()
        };
      });
      this.getAccountTotalValue(this.accountOperationArray);
    });
    this.notification('Reload Successfully !');
  }

  // Get, Calculat && Show the total value amount of the account
  getAccountTotalValue(array) {
    const value = this.operationService.getTotalAccountOperationValue(array);
    const element = document.getElementById('Total-Account-Operation-Value');
    element.innerHTML = 'Total: ' + value;
  }

  // custom notifination
  notification(message) {
    const msg = document.getElementById('alert-msg');
    msg.style.color = '#fff';
    msg.style.fontSize = '18px';
    msg.innerText = message;

    setTimeout(() => msg.innerText = '', 3000);
  }

  // SearchBox
  searchBox() {
    this.searchText = '';
  }

  // Filter Through
  filterCondition(operation) {
    return this.encrDecrService.decrypt(operation.Name).toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }

  viewTheOperation(operation) {
    // Set the date
    const textView = document.getElementById('operation-card-box-text');

   // Drop down the box with the details of the operation
    if (this.viewOperation) {
      const dropBox = document.getElementById('operation-card-box');
      const text = '<hr>' + this.encrDecrService.decrypt(operation.Category) + '<br>' +
                   this.dateService.getCurrentDateString(this.encrDecrService.decrypt(operation.Date), 'fullDate') + '<br>' +
                   this.encrDecrService.decrypt(operation.Type);

      dropBox.style.display = 'block';
      textView.innerHTML = text;
      this.viewOperation = false;

    } else {
      const dropBox = document.getElementById('operation-card-box');
      dropBox.style.display = 'none';
      textView.innerHTML = '';
      this.viewOperation = true;
    }
  }

}
