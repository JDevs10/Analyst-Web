import { Component, OnInit } from '@angular/core';

import { OperationServiceService } from '../service/operation-service.service';
import { EncrDecrService } from '../service/encr-decr.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account-new-operation',
  templateUrl: './account-new-operation.component.html',
  styleUrls: ['./account-new-operation.component.css']
})
export class AccountNewOperationComponent implements OnInit {

  constructor(public operationService: OperationServiceService,
              public encrDecrService: EncrDecrService,
              private route: ActivatedRoute,
              private router: Router) { }

  submitted: boolean;
  firstSync = true;
  formControls = this.operationService.operationForm.controls;

  ngOnInit() {

  }

  addNewOperationSubmit() {
    const operationX = this.operationService;
    const operationFormX = this.operationService.operationForm;
    const encrDecrServiceX = this.encrDecrService;
    let submittedX;

    this.submitted = true;
    if (this.operationService.operationForm.valid) {
      if (this.operationService.operationForm.get('$key').value == null) {
        this.operationService.getOperationAccountCurrency().then(function(snapshot) {
          // get the currency type from the account
          let currency = snapshot.val().Currency;

          operationFormX.patchValue({
            Name: encrDecrServiceX.encrypt(operationFormX.get('Name').value),
            Value: encrDecrServiceX.encrypt(operationFormX.get('Value').value),
            Category: encrDecrServiceX.encrypt(operationFormX.get('Category').value),
            Currency: currency,
            Date: encrDecrServiceX.encrypt(Date.now().toString()),
            Type: encrDecrServiceX.encrypt(operationFormX.get('Type').value),
          });
          operationX.addOperation(operationFormX.value);
          operationFormX.reset();
          // submittedX = false;
          console.log('addNewOperationSubmit() End 1');
        });
        this.submitted = false;
        console.log('addNewOperationSubmit() End 2');
      } else {
        console.log('$key != null || $key == ' + this.operationService.operationForm.get('$key').value);
      }
    } else {
      console.log('operationForm not valid');
    }
  }

  cancelNewOperationSubmit() {
    const accountId = this.encrDecrService.decrypt(localStorage.getItem('accountID'));
    this.router.navigate(['/accounts/' + accountId + '/operations'], {relativeTo: this.route});
  }
}
