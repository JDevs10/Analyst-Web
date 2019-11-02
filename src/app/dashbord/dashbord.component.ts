import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

  }

  // About
  closeAboutPopup(){
    let MainPopup = document.getElementById('main-popup');
    let aboutPopup = document.getElementById('about-popup');

    MainPopup.style.display = 'none';
    aboutPopup.style.display = 'none';
  }

  showAccountList() {
    this.router.navigate(['accounts'], {relativeTo: this.route});
  }

  /*
  showAccountGraphList() {
    this.router.navigate(['accounts/graph'], {relativeTo: this.route});
  }
  */










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
