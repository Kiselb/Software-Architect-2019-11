import { TestBed } from '@angular/core/testing';

import { ServiceRequestDetailsService } from './service-request-details.service';

describe('ServiceRequestDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceRequestDetailsService = TestBed.get(ServiceRequestDetailsService);
    expect(service).toBeTruthy();
  });
});
