import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncrDecrService } from './encr-decr.service';

// import * as firebase from 'firebase/app';
import * as firebase from 'firebase/app';

// import firebase from 'firebase/app';
import 'firebase/auth';

import { resolve } from 'url';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router,
              private encrDecrService: EncrDecrService) { }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  loggedIn(){
    // if the userUid token exist the return is true or else false
    return !!localStorage.getItem('userToken');
  }

  doLogin(value){
    firebase.auth().signInWithEmailAndPassword(value.email, value.password)
    .then((returnedUser) =>{
      localStorage.setItem('userEmail', this.encrDecrService.encrypt(firebase.auth().currentUser.email));
      localStorage.setItem('userUid', this.encrDecrService.encrypt(firebase.auth().currentUser.uid));
      firebase.auth().currentUser.getIdToken().then((value) => {
        localStorage.setItem('userToken', this.encrDecrService.encrypt(value.toString()));
      });
      window.location.href = 'home';

    }).catch((error) =>{
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert('Error :\nErrorCode: ' + errorCode + '\nErrorMessage: ' + errorMessage);
    });
  }

  getCurrentUserEmail(): string{
    let userEmail = localStorage.getItem('userEmail');
    userEmail = this.encrDecrService.decrypt(userEmail);
    return userEmail;
  }

  getCurrentUserUid(): string{
    let userUid = localStorage.getItem('userUid');
    userUid = this.encrDecrService.decrypt(userUid);
    return userUid;
  }

  getCurrentUserToken(): string{
    let userToken = localStorage.getItem('userToken');
    userToken = this.encrDecrService.decrypt(userToken);
    return userToken;
  }

  doLogout() {
    firebase.auth().signOut().then(() => {
       localStorage.removeItem('userUid');
       localStorage.removeItem('userEmail');
       localStorage.removeItem('userToken');
       window.location.href = 'login';
    }).catch(function(error) {
      // An error happened.
      window.alert("Error : Can't Logout !!!\nInfo :\n"+error);
    });
 }
}
