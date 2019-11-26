import { Component, OnInit } from '@angular/core';
import { OperationCategoryServiceService } from '../service/operation-category-service.service';

@Component({
  selector: 'app-account-new-operation-category',
  templateUrl: './account-new-operation-category.component.html',
  styleUrls: ['./account-new-operation-category.component.css']
})
export class AccountNewOperationCategoryComponent implements OnInit {

  constructor(private operationCategoryService: OperationCategoryServiceService) { }

  operationCategoryArray = [];
  submitted: boolean;
  firstSync = true;

  ngOnInit() {
    if (this.firstSync) {
      this.firstSyncReload();
      this.firstSync = false;
    }
    document.getElementById('Sync').addEventListener('click', (b) => {
      // this.getWindownScreenSize();
      this.operationCategoryService.getOperationCategories().subscribe(List => {
        this.operationCategoryArray = List.map(item => {
          return {
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
    this.operationCategoryService.getOperationCategories().subscribe(List => {
      this.operationCategoryArray = List.map(item => {
        return {
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

}
