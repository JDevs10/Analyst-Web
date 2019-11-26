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
import { AccountListComponent } from './account-list/account-list.component';
import { AccountGraphListComponent } from './account-graph-List/account-graph-List.component';
import { ChartsModule } from 'ng2-charts';
import { AccountOperationListComponent } from './account-operation-list/account-operation-list.component';
import { AccountComponent } from './account/account.component';
import { AccountNewOperationComponent } from './account-new-operation/account-new-operation.component';
import { AccountNewOperationCategoryComponent } from './account-new-operation-category/account-new-operation-category.component';

@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent,
    FooterComponent,
    UserLoginComponent,
    HeaderComponent,
    AccountListComponent,
    AccountGraphListComponent,
    AccountOperationListComponent,
    AccountComponent,
    AccountNewOperationComponent,
    AccountNewOperationCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    ChartsModule,
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
