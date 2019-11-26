import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { DashbordComponent } from '../app/dashbord/dashbord.component';
import { AccountListComponent } from '../app/account-list/account-list.component';
import { AccountComponent } from './account/account.component';
import { AccountOperationListComponent } from './account-operation-list/account-operation-list.component';
import { AccountNewOperationComponent } from './account-new-operation/account-new-operation.component';
import { AccountNewOperationCategoryComponent } from './account-new-operation-category/account-new-operation-category.component';
import { AccountGraphListComponent } from './account-graph-List/account-graph-List.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: UserLoginComponent},
  { path: 'home', redirectTo: '/home/accounts', pathMatch: 'full'},
  { path: 'home', component: DashbordComponent, canActivate: [AuthGuard],
    children: [
      { path: 'accounts', component: AccountListComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'accounts/:accountId', redirectTo: '/accounts/:accountId/operations', pathMatch: 'full'},
  { path: 'accounts/:accountId', component: AccountComponent, canActivate: [AuthGuard],
    children: [
      { path: 'operations', component: AccountOperationListComponent, canActivate: [AuthGuard] },
      { path: 'new-operation', component: AccountNewOperationComponent, canActivate: [AuthGuard] },
      { path: 'new-operation-category', component: AccountNewOperationCategoryComponent, canActivate: [AuthGuard] },
      { path: 'graph', component: AccountGraphListComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  declarations: [],
  exports: [ RouterModule ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
