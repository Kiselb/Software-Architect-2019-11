import { TestBed } from '@angular/core/testing';

import { RequestsTypesService } from './requests-types.service';

describe('RequestsTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestsTypesService = TestBed.get(RequestsTypesService);
    expect(service).toBeTruthy();
  });
});
