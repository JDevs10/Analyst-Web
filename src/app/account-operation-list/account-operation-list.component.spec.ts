import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOperationListComponent } from './account-operation-list.component';

describe('AccountOperationListComponent', () => {
  let component: AccountOperationListComponent;
  let fixture: ComponentFixture<AccountOperationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountOperationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOperationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
