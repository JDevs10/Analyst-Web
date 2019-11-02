import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNewOperationComponent } from './account-new-operation.component';

describe('AccountNewOperationComponent', () => {
  let component: AccountNewOperationComponent;
  let fixture: ComponentFixture<AccountNewOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountNewOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountNewOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
