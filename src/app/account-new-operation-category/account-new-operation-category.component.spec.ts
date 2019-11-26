import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNewOperationCategoryComponent } from './account-new-operation-category.component';

describe('AccountNewOperationCategoryComponent', () => {
  let component: AccountNewOperationCategoryComponent;
  let fixture: ComponentFixture<AccountNewOperationCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountNewOperationCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountNewOperationCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
