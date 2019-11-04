import { Component, OnInit } from '@angular/core';
import { EncrDecrService } from '../service/encr-decr.service';
import { OperationServiceService } from '../service/operation-service.service';

@Component({
  selector: 'app-account-operation-list',
  templateUrl: './account-operation-list.component.html',
  styleUrls: ['./account-operation-list.component.css']
})
export class AccountOperationListComponent implements OnInit {

  constructor(public operationService: OperationServiceService,
              public encrDecrService: EncrDecrService) { }

  searchText = '';
  firstSync = true;
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
        });
      this.notification('Reload Successfully !');
      });
  }

  // Add Sync to Sync current account and window size
  firstSyncReload() {
    // this.getWindownScreenSize();
    this.operationService.getOperations().subscribe(
      List => {
        this.accountOperationArray = List.map(item => {
          return{
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
    this.notification('Reload Successfully !');
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
  filterCondition(account) {
    return this.encrDecrService.decrypt(account.Name).toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }

}
