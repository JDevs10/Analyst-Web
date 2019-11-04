import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { AuthenticationService } from './authentication.service';
import { EncrDecrService } from './encr-decr.service';
import { timeout } from 'q';

@Injectable({
  providedIn: 'root'
})
export class OperationServiceService {

  constructor(private db: AngularFireDatabase,
              private authenticationService: AuthenticationService,
              private encrDecrService: EncrDecrService) { }
  currencyValue = 'a';
  operationList: AngularFireList<any>;

  operationForm = new FormGroup({
    $key: new FormControl(null),
    Name: new FormControl('', Validators.required),
    Value: new FormControl('', Validators.required),
    Category: new FormControl('', Validators.required),
    Currency: new FormControl(''),
    Date: new FormControl(''),
    Type: new FormControl('', Validators.required)
  });

  getOperations() {
    const accountId = this.encrDecrService.decrypt(localStorage.getItem('accountID'));
    this.operationList = this.db.list(this.authenticationService.getCurrentUserUid() + '/accounts/' + accountId + '/Transactions');
    return this.operationList.snapshotChanges();
  }

  getOperationAccountCurrency() {
    const accountId = this.encrDecrService.decrypt(localStorage.getItem('accountID'));
    return this.db.database.ref(this.authenticationService.getCurrentUserUid() + '/accounts/' + accountId).once('value');
  }

  addOperation(operation) {
    const accountId = this.encrDecrService.decrypt(localStorage.getItem('accountID'));
    this.db.list(this.authenticationService.getCurrentUserUid() + '/accounts/' + accountId + '/Transactions').push({
      Name: operation.Category,
      Value: operation.Value,
      Category: operation.Category,
      Currency: operation.Currency,
      Date: operation.Date,
      Type: operation.Type
    });
    console.log('addOperation() end');
  }

  populateOperationEditForm(operation) {
    this.operationForm.setValue(operation);
  }

  updateOperation(operation) {
    this.operationList.update(operation.$key,
      {
        Name: operation.Category,
        Value: operation.Value,
        Category: operation.Category,
        Currency: operation.Currency,
        Date: operation.Date,
        Type: operation.Type
      });
    }

    deleteOperation($key: string) {
      this.operationList.remove($key);
    }
}
