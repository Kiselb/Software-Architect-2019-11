import { TestBed } from '@angular/core/testing';

import { JWTInterceptorService } from './jwtinterceptor.service';

describe('JWTInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JWTInterceptorService = TestBed.get(JWTInterceptorService);
    expect(service).toBeTruthy();
  });
});
