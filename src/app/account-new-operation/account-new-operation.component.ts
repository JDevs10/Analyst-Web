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
  categoryArray = [];
  formControls = this.operationService.operationForm.controls;

  ngOnInit() {
    this.newCategoryVisibility();
    this.operationService.getAllCategories().snapshotChanges().subscribe(List => {
      this.categoryArray = List.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      this.loadSelecteCategories( this.categoryArray);
    });
  }

  addNewOperationSubmit() {
    const operationX = this.operationService;
    const operationFormX = this.operationService.operationForm;
    const encrDecrServiceX = this.encrDecrService;
    let submittedX;

    this.submitted = true;
    if (this.operationService.operationForm.valid) {
      const operationCategories = this.categoryArray;
      if (this.operationService.operationForm.get('$key').value == null) {
        console.log('categories: ' + operationCategories.length);

        this.operationService.getOperationAccountCurrency().then(function(snapshot) {

          // get new category from user
          const inputNewCat = document.getElementById('newCategoryID') as HTMLInputElement;
          const selectCat = document.getElementById('selectCategoryID') as HTMLSelectElement;
          let categoryValue;

          if (selectCat.options[selectCat.selectedIndex].value == 'New') {
            for (let x = 0; x < operationCategories.length; x++) {
              if (operationCategories[x].Name == inputNewCat.value) {
                alert('Category "' + operationCategories[x].Name + '" exist already!');
                return;
              }
            }
            categoryValue = inputNewCat.value;
          } else {
            categoryValue = operationFormX.get('Category').value;
          }

          console.log('End Cat Value: ' + categoryValue);

          // get the currency type from the account
          const currency = snapshot.val().Currency;
          let typeSymbol = operationFormX.get('Type').value;

          console.log('typeSymbol 1: ' + typeSymbol);
          if (typeSymbol == 'income') {
            typeSymbol = '+';
            console.log('typeSymbol 2: ' + typeSymbol);
          }
          if (typeSymbol == 'expenses') {
            typeSymbol = '-';
            console.log('typeSymbol 3: ' + typeSymbol);
          }

          operationFormX.patchValue({
            Name: encrDecrServiceX.encrypt(operationFormX.get('Name').value),
            Value: encrDecrServiceX.encrypt(operationFormX.get('Value').value),
            Category: encrDecrServiceX.encrypt(categoryValue),
            Currency: currency,
            Date: encrDecrServiceX.encrypt(Date.now().toString()),
            Type: encrDecrServiceX.encrypt(operationFormX.get('Type').value),
            TypeSymbol: encrDecrServiceX.encrypt(typeSymbol)
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

  loadSelecteCategories(categoryArray) {
    const selectCat = document.getElementById('selectCategoryID') as HTMLSelectElement;

    for (let x=0; x < categoryArray.length; x++) {
      // get reference to select element
      const option = document.createElement('option');
      option.appendChild( document.createTextNode('' + categoryArray[x].Name) );
      option.value = categoryArray[x].Name;
      selectCat.appendChild(option);
    }
    const optionE = document.createElement('option');
    optionE.appendChild( document.createTextNode('New') );
    optionE.value = 'New';
    selectCat.appendChild(optionE);
  }

  newCategoryVisibility() {
    const inputNewCat = document.getElementById('newCategoryID') as HTMLInputElement;
    const selectCat = document.getElementById('selectCategoryID') as HTMLSelectElement;

    if (selectCat.options[selectCat.selectedIndex].value == 'New') {
      inputNewCat.style.display = 'block';
    } else {
      inputNewCat.style.display = 'none';
    }
  }
}
