import { TestBed } from '@angular/core/testing';

import { ServiceRequestHeaderUpdateService } from './service-request-header-update.service';

describe('ServiceRequestHeaderUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceRequestHeaderUpdateService = TestBed.get(ServiceRequestHeaderUpdateService);
    expect(service).toBeTruthy();
  });
});
