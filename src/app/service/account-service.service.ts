import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  constructor(private db: AngularFireDatabase,
              private authenticationService: AuthenticationService) { }
  accountList: AngularFireList<any>;

  accountForm = new FormGroup({
    $key: new FormControl(null),
    Name: new FormControl('', Validators.required),
    Image: new FormControl('', Validators.required),
    Value: new FormControl('', Validators.required),
    Category: new FormControl('', Validators.required),
    Currency: new FormControl('', Validators.required),
    Color: new FormControl('', Validators.required)
  });

  getAccount() {
    this.accountList = this.db.list(this.authenticationService.getCurrentUserUid() + '/accounts');
    return this.accountList.snapshotChanges();
  }

  addAccount(account) {
    this.accountList.push({
      Category: account.Category,
      Color: account.Color,
      Currency: account.Currency,
      Image: account.Image,
      Name: account.Name,
      Value: account.Value
    });
  }

  populateEditForm(account) {
    this.accountForm.setValue(account);
  }

  updateAccount(account) {
    this.accountList.update(account.$key,
      {
        Category: account.Category,
        Color: account.Color,
        Currency: account.Currency,
        Image: account.Image,
        Name: account.Name,
        Value: account.Value
      });
    }

    deleteAccount($key: string) {
      this.accountList.remove($key);
    }
}
