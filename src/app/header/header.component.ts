import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { DashbordComponent } from '../dashbord/dashbord.component';
import { AccountServiceService } from '../service/account-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService,
    private dashbord: DashbordComponent,
    private accountService: AccountServiceService) { }

  ngOnInit() {
  }

  // About
  openAboutPopup(){
    var MainPopup = document.getElementById("main-popup");
    var aboutPopup = document.getElementById("about-popup");

    MainPopup.style.display = "Block";
    aboutPopup.style.display = "Block";
  }

}
