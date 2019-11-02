import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountGraphListComponent } from './account-graph-List.component';

describe('AccountGraphComponent', () => {
  let component: AccountGraphListComponent;
  let fixture: ComponentFixture<AccountGraphListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountGraphListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountGraphListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
