import { TestBed } from '@angular/core/testing';

import { OperationCategoryServiceService } from './operation-category-service.service';

describe('OperationCategoryServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperationCategoryServiceService = TestBed.get(OperationCategoryServiceService);
    expect(service).toBeTruthy();
  });
});
