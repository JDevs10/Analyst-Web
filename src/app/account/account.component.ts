import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { EncrDecrService } from '../service/encr-decr.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(public encrDecrService: EncrDecrService,
              private route: ActivatedRoute,
              private router: Router) { }

  currentAccount = '';
  ngOnInit() {
    this.getCurrentAccount();
  }

  getCurrentAccount() {
    this.currentAccount = this.encrDecrService.decrypt(localStorage.getItem('accountID'));
  }

  // About
  closeAboutPopup() {
    let MainPopup = document.getElementById('main-popup');
    let aboutPopup = document.getElementById('about-popup');

    MainPopup.style.display = 'none';
    aboutPopup.style.display = 'none';
  }

  showAccountOperationList(accountId) {
    this.router.navigate(['/accounts/' + accountId + '/operations'], {relativeTo: this.route});
  }

  showAccountNewOperation(accountId) {
    this.router.navigate(['/accounts/' + accountId + '/new-operation'], {relativeTo: this.route});
  }

  showAccountNewOperationCategory(accountId){
    this.router.navigate(['/accounts/' + accountId + '/new-operation-category'], {relativeTo: this.route});
  }

  showAccountGraphOperationList(accountId) {
    this.router.navigate(['/accounts/' + accountId + '/graph'], {relativeTo: this.route});
  }
}
