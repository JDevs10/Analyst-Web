import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { AuthenticationService } from './authentication.service';
import { EncrDecrService } from './encr-decr.service';
import { timeout } from 'q';
import { AccountServiceService } from './account-service.service';

@Injectable({
  providedIn: 'root'
})
export class OperationServiceService {

  constructor(private db: AngularFireDatabase,
              private accountService: AccountServiceService,
              private authenticationService: AuthenticationService,
              private encrDecrService: EncrDecrService) { }

  operationList: AngularFireList<any>;
  account = [];

  operationForm = new FormGroup({
    $key: new FormControl(null),
    Name: new FormControl('', Validators.required),
    Value: new FormControl('', Validators.required),
    Category: new FormControl('', Validators.required),
    Currency: new FormControl(''),
    Date: new FormControl(''),
    Type: new FormControl('', Validators.required),
    TypeSymbol: new FormControl('')
  });

  syncOperations() {
    // this.getWindownScreenSize();
    this.getOperations().subscribe(List => {
      return List.map(item => {
        return{
          $key: item.key,
          ...item.payload.val()
        };
      });
    });
  }

  getTotalAccountOperationValue(accountOperationArray) {
    let totalValue = 0;
    for (let operation of accountOperationArray) {
      if (this.encrDecrService.decrypt(operation.TypeSymbol) == '+') {
        totalValue += parseFloat(this.encrDecrService.decrypt(operation.Value));
      } else if (this.encrDecrService.decrypt(operation.TypeSymbol) == '-') {
        totalValue -= parseFloat(this.encrDecrService.decrypt(operation.Value));
      }
    }
    return totalValue;
  }

  getOperations() {
    const accountId = this.encrDecrService.decrypt(localStorage.getItem('accountID'));
    this.operationList = this.db.list(this.authenticationService.getCurrentUserUid() + '/accounts/' + accountId + '/Transactions');
    return this.operationList.snapshotChanges();
  }

  getOperationsByAccountId(accountID) {
    this.operationList = this.db.list(this.authenticationService.getCurrentUserUid() + '/accounts/' + accountID + '/Transactions');
    return this.operationList.snapshotChanges();
  }

  getOperationAccountCurrency() {
    const accountId = this.encrDecrService.decrypt(localStorage.getItem('accountID'));
    return this.db.database.ref(this.authenticationService.getCurrentUserUid() + '/accounts/' + accountId).once('value');
  }

  addOperation(operation) {
    const accountId = this.encrDecrService.decrypt(localStorage.getItem('accountID'));
    this.db.list(this.authenticationService.getCurrentUserUid() + '/accounts/' + accountId + '/Transactions').push({
      Name: operation.Name,
      Value: operation.Value,
      Category: operation.Category,
      Currency: operation.Currency,
      Date: operation.Date,
      Type: operation.Type,
      TypeSymbol: operation.TypeSymbol
    });
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
        Type: operation.Type,
        TypeSymbol: operation.TypeSymbol
      });
    }

    deleteOperation($key: string) {
      this.operationList.remove($key);
    }

    updateAccountValue(accountID) {
      this.getOperationsByAccountId(accountID).subscribe(List => {
        let array = List.map(item => {
          return{
            $key: item.key,
            ...item.payload.val()
          };
        });
        const value = this.encrDecrService.encrypt('' + this.getTotalAccountOperationValue(array));
        this.db.database.ref(this.authenticationService.getCurrentUserUid() + '/accounts/' + accountID).update({Value: value});
      });
    }

    getAllCategories() {
      const accountId = this.encrDecrService.decrypt(localStorage.getItem('accountID'));
      return this.db.list(this.authenticationService.getCurrentUserUid() + '/accounts/' + accountId + '/Categories/Operations');
    }
}
