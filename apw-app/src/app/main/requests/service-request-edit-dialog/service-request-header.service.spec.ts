import { TestBed } from '@angular/core/testing';

import { ServiceRequestHeaderService } from './service-request-header.service';

describe('ServiceRequestHeaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceRequestHeaderService = TestBed.get(ServiceRequestHeaderService);
    expect(service).toBeTruthy();
  });
});
