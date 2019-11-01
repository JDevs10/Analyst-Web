import { Component, OnInit } from '@angular/core';

import { AccountServiceService } from '../service/account-service.service';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private accountService: AccountServiceService,
    public authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  tryLogin(value) {
    this.authenticationService.doLogin(value);
  }

}
