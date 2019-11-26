import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { AuthenticationService } from './authentication.service';
import { EncrDecrService } from './encr-decr.service';
import { AccountServiceService } from './account-service.service';

@Injectable({
  providedIn: 'root'
})
export class OperationCategoryServiceService {

  constructor(private db: AngularFireDatabase,
              private accountService: AccountServiceService,
              private authenticationService: AuthenticationService,
              private encrDecrService: EncrDecrService) { }

  operationCategoryList: AngularFireList<any>;
  //account = [];

  operationCategoryForm = new FormGroup({
    $key: new FormControl(null),
    Name: new FormControl('', Validators.required)
  });

  syncOperationCategories() {
    // this.getWindownScreenSize();
    this.getOperationCategories().subscribe(List => {
      return List.map(item => {
        return{
          $key: item.key,
          ...item.payload.val()
        };
      });
    });
  }

  getOperationCategories() {
    const accountId = this.encrDecrService.decrypt(localStorage.getItem('accountID'));
    this.operationCategoryList = this.db.list(this.authenticationService.getCurrentUserUid() + '/accounts/' + accountId + '/Categories/Operations');
    return this.operationCategoryList.snapshotChanges();
  }

  addOperation(category) {
    const accountId = this.encrDecrService.decrypt(localStorage.getItem('accountID'));
    this.db.list(this.authenticationService.getCurrentUserUid() + '/accounts/' + accountId + '/Categories/Operations').push({
      Name: category.Name
    });
  }

  deleteOperation($key: string) {
    this.operationCategoryList.remove($key);
  }
}
