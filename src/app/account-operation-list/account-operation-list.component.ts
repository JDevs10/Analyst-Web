import { Component, OnInit } from '@angular/core';
import { EncrDecrService } from '../service/encr-decr.service';

@Component({
  selector: 'app-account-operation-list',
  templateUrl: './account-operation-list.component.html',
  styleUrls: ['./account-operation-list.component.css']
})
export class AccountOperationListComponent implements OnInit {

  constructor(public encrDecrService: EncrDecrService) { }

  searchText = '';

  ngOnInit() {
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
