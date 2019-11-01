import { Component, OnInit } from '@angular/core';

import { AccountServiceService } from '../service/account-service.service';
import { EncrDecrService } from '../service/encr-decr.service';


@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  constructor(public accountService: AccountServiceService,
              public encrDecrService: EncrDecrService) { }
  accountArray = [];
  viewaccountServiceSelected = [];

  searchText = '';
  pwd = '';
  submitted: boolean;
  seeHiddenPasswordCheck = true;
  seeDecryptInfo = true;
  see = false;
  firstSync = true;
  formControls = this.accountService.accountForm.controls;

  // show encrypted info
  Login_d = '';
  SecondaryLogin_d = '';
  Category_d = '';

  ngOnInit() {
    if (this.firstSync) {
      this.firstSyncReload();
      this.firstSync = false;
    }
    document.getElementById('Sync').addEventListener('click', (b) => {
      this.getWindownScreenSize();
      this.accountService.getAccount().subscribe(
        List => {
          this.accountArray = List.map(item => {
            return{
              $key: item.key,
              ...item.payload.val()
            };
          });
        });
      const currentdate = new Date();
      const datetime = currentdate.getDate() + '/'
                      + (currentdate.getMonth() + 1)  + '/'
                      + currentdate.getFullYear() + ' @ '
                      + currentdate.getHours() + ':'
                      + currentdate.getMinutes() + ':'
                      + currentdate.getSeconds();
      document.getElementById('footer-sync-info-time').innerText = datetime;
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
    this.accountService.getAccount().subscribe(
      List => {
        this.accountArray = List.map(item => {
          return{
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
    const currentdate = new Date();
    const datetime = currentdate.getDate() + '/'
                    + (currentdate.getMonth() + 1)  + '/'
                    + currentdate.getFullYear() + ' @ '
                    + currentdate.getHours() + ':'
                    + currentdate.getMinutes() + ':'
                    + currentdate.getSeconds();
    document.getElementById('footer-sync-info-time').innerText = datetime;
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
    const popupPassword = document.getElementById('popup-new-password');

    popup.style.display = 'block';
    popupPassword.style.display = 'block';
  }

  // Add account
  addNewAccountSubmit() {
    this.submitted = true;
    if (this.accountService.accountForm.valid) {
      if (this.accountService.accountForm.get('$key').value == null) {
        this.accountService.accountForm.patchValue({
          Name: this.encrDecrService.encrypt(this.accountService.accountForm.get('Name').value),
          Image: this.encrDecrService.encrypt(this.accountService.accountForm.get('Image').value),
          StartAmount: this.encrDecrService.encrypt(this.accountService.accountForm.get('Value').value),
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
    const popupPassword = document.getElementById('popup-new-password');

    popup.style.display = 'none';
    popupPassword.style.display = 'none';
  }

  // View account
  viewTheAccount(account) {
    this.closeTheAccountPopUpNew();

    alert('Account ' + this.encrDecrService.decrypt(account.Name) + ' Selected !!!');

    // open a new component in the dashbord
    /*
    const popup = document.getElementById('pop-up');
    const popupPassword = document.getElementById('popup-view-password');

    popup.style.display = 'block';
    popupPassword.style.display = 'block';

    this.viewPasswordSelected = [password];
    this.Login_d = password.Login;
    this.SecondaryLogin_d = password.SecondaryLogin;
    this.Category_d = password.Category;
    this.setPwd(password.Password);
    this.see = true;
    */
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





/*
  // Hold the pwd
  setPwd(pwd: string){
    this.pwd = pwd;
  }

  getPwd(): string{
    return this.pwd;
  }

  emptyPwd(): string{
    this.setPwd('');
    return this.getPwd();
  }

  // see decrypted password
  seeHidePassword(password: string){
    if (this.seeHiddenPasswordCheck == true){
      var decrypt = this.encrDecrService.decrypt(password);
      var p_show = document.getElementById('viewPopupPassword');
      p_show.innerText = 'Password : ' + decrypt;
      document.getElementById('viewPopup-see-btn-pwd').innerHTML = '<i class="far fa-eye-slash"></i>';
      this.seeHiddenPasswordCheck = false;
    }else{
      var p_show = document.getElementById('viewPopupPassword');
      p_show.innerText = 'Password : ' + this.getPwd();
      document.getElementById('viewPopup-see-btn-pwd').innerHTML = '<i class="far fa-eye"></i>';
      this.seeHiddenPasswordCheck = true;
    }
  }

  hidePassword(){
    if (this.see == true){
      var p_show = document.getElementById('viewPopupPassword');
      p_show.innerText = 'Password : ' + this.getPwd();
      document.getElementById('viewPopup-see-btn-pwd').innerHTML = '<i class="far fa-eye"></i>';
      this.seeHiddenPasswordCheck = true;
    }
  }

  decryptInfo(password){
    var Login = document.getElementById('viewPopupLogin');
    var SecondaryLogin = document.getElementById('viewPopupSecondaryLogin');
    var Category = document.getElementById('viewPopupCategory');
    var decryptInfo_btn = document.getElementById('decryptInfo-btn');

    this.Login_d = password.Login;
    this.SecondaryLogin_d = password.SecondaryLogin;
    this.Category_d = password.Category;

    if (this.seeDecryptInfo){

      Login.innerText = 'Login: ' + this.encrDecrService.decrypt(password.Login);
      SecondaryLogin.innerText = 'SecondaryLogin: ' + this.encrDecrService.decrypt(password.SecondaryLogin);
      Category.innerText = 'Category: ' + this.encrDecrService.decrypt(password.Category);
      decryptInfo_btn.innerText = 'Encrypt Info';

      this.seeDecryptInfo = false;
    }else{
      Login.innerText = 'Login: ' + this.Login_d;
      SecondaryLogin.innerText = 'SecondaryLogin: ' + this.SecondaryLogin_d;
      Category.innerText = 'Category: ' + this.Category_d;
      decryptInfo_btn.innerText = 'Decrypt Info';

      this.seeDecryptInfo = true;
    }
  }

  hideEncryptInfo() {
    if (this.see == true) {
      let Login = document.getElementById('viewPopupLogin');
      let SecondaryLogin = document.getElementById('viewPopupSecondaryLogin');
      let Category = document.getElementById('viewPopupCategory');
      let decryptInfo_btn = document.getElementById('decryptInfo-btn');

      Login.innerText = 'Login: ' + this.Login_d;
      SecondaryLogin.innerText = 'SecondaryLogin: ' + this.SecondaryLogin_d;
      Category.innerText = 'Category: ' + this.Category_d;
      decryptInfo_btn.innerText = 'Decrypt Info';

      this.seeDecryptInfo = true;
    }
  }

  closeTheAccountPopUp() {
    const popup = document.getElementById('pop-up');
    const popupPassword = document.getElementById('popup-view-password');

    popup.style.display = 'none';
    popupPassword.style.display = 'none';

    this.hidePassword();
    this.hideEncryptInfo();
  }
  */

}
