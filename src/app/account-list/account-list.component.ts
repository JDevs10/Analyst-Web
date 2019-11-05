import { Component, OnInit } from '@angular/core';

import { AccountServiceService } from '../service/account-service.service';
import { EncrDecrService } from '../service/encr-decr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OperationServiceService } from '../service/operation-service.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  constructor(public accountService: AccountServiceService,
              private operationService: OperationServiceService,
              public encrDecrService: EncrDecrService,
              private route: ActivatedRoute,
              private router: Router) { }
  accountArray = [];
  accountImageArray = [
    {Symbol: '£', Name: 'fa-pound-sign'},
    {Symbol: '€', Name: 'fa-euro-sign'},
    {Symbol: '$', Name: 'fa-dollar-sign'},
    {Symbol: 'C$', Name: 'fa-canadian-maple-leaf'},
    {Symbol: '¥', Name: 'fa-yen-sign'}
  ];

  searchText = '';
  submitted: boolean;
  formControls = this.accountService.accountForm.controls;
  firstSync = true;

  ngOnInit() {
    if (this.firstSync) {
      this.firstSyncReload();
      this.firstSync = false;
    }
    document.getElementById('Sync').addEventListener('click', (b) => {
      this.getWindownScreenSize();
      this.accountService.getAccounts().subscribe(List => {
        this.accountArray = List.map(item => {
          const x = {
            $key: item.key,
            ...item.payload.val()
          };

          // Update every account value
          this.updateAccountValue(item.key);
          return x;
          });
      });
      this.notification('Reload Successfully !');
    });

    if (this.encrDecrService.decrypt(localStorage.getItem('userEmail')) == 'analyst-test@gmail.com') {
        window.alert('Welcome to a test account!\nUser : analyst-test@gmail.com\nAny information stored on this ' +
        'account will be deleted and advised not to store personal infomation !!!');
      }
  }

  // Add Sync to Sync current account and window size
  firstSyncReload() {
    this.getWindownScreenSize();
    this.accountService.getAccounts().subscribe(List => {
      this.accountArray = List.map(item => {
        const x = {
          $key: item.key,
          ...item.payload.val()
        };

        // Update every account value
        this.updateAccountValue(item.key);
        return x;
      });
    });
    this.notification('Reload Successfully !');
  }

  // Update every account value
  updateAccountValue(accountID) {
    this.operationService.updateAccountValue(accountID);
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

  getWindownScreenSize() {
    const div_row = document.getElementById('row');
    const div_mainContent = document.getElementById('main-content');

    let browserHeight = $(window).height();
    let browserContentWidth = $(window).width();

    browserHeight = browserHeight - 56;
    div_row.style.height = browserHeight + 'px';

    browserContentWidth = browserContentWidth - 900;
    div_mainContent.style.height = browserContentWidth + 'px';
  }

  // New Account popup
  openTheAccountPopUpNew() {
    const popup = document.getElementById('pop-up');
    const popupPassword = document.getElementById('popup-new-account');

    popup.style.display = 'block';
    popupPassword.style.display = 'block';
  }

  // Add account
  addNewAccountSubmit() {
    this.submitted = true;
    if (this.accountService.accountForm.valid) {
      if (this.accountService.accountForm.get('$key').value == null) {

        let imageValue = '';
        for (let index = 0; index < this.accountImageArray.length; index++) {
          if (this.accountService.accountForm.get('Currency').value == this.accountImageArray[index].Symbol) {
            imageValue = this.accountImageArray[index].Name;
          }
        }

        this.accountService.accountForm.patchValue({
          Name: this.encrDecrService.encrypt(this.accountService.accountForm.get('Name').value),
          Image: this.encrDecrService.encrypt(imageValue),
          Value: this.encrDecrService.encrypt(this.accountService.accountForm.get('Value').value),
          Category: this.encrDecrService.encrypt(this.accountService.accountForm.get('Category').value),
          Currency: this.encrDecrService.encrypt(this.accountService.accountForm.get('Currency').value),
          Color: this.encrDecrService.encrypt(this.accountService.accountForm.get('Color').value)
        });
        this.accountService.addAccount(this.accountService.accountForm.value);
        this.notification('Submitted Successfully !');
        this.accountService.accountForm.reset();
      }
      this.submitted = false;
    }
  }

  closeTheAccountPopUpNew() {
    const popup = document.getElementById('pop-up');
    const popupPassword = document.getElementById('popup-new-account');

    popup.style.display = 'none';
    popupPassword.style.display = 'none';
  }

  // View account
  viewTheAccount(account) {
    this.closeTheAccountPopUpNew();
    localStorage.setItem('accountID', this.encrDecrService.encrypt(account.$key));
    this.router.navigate(['/accounts/' + account.$key + '/operations'], {relativeTo: this.route});
  }

  // Delete Account
  deleteTheAccountSelected($key) {
    this.accountService.deleteAccount($key);
    this.notification('Account deleted !');
  }

  // About Popup
  closeAboutPopup() {
    const MainPopup = document.getElementById('main-popup');
    const aboutPopup = document.getElementById('about-popup');

    MainPopup.style.display = 'none';
    aboutPopup.style.display = 'none';
  }

}
