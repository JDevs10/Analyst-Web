import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';

import * as $ from '../../node_modules/@types/jquery';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccountServiceService } from './service/account-service.service';
import { EncrDecrService } from './service/encr-decr.service';
import { AuthenticationService } from './service/authentication.service';
import { AuthGuard } from './auth.guard';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent,
    FooterComponent,
    UserLoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [
    AccountServiceService,
    EncrDecrService,
    AuthenticationService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
