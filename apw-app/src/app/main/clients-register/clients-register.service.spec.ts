import { TestBed } from '@angular/core/testing';

import { ClientsRegisterService } from './clients-register.service';

describe('ClientsRegisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientsRegisterService = TestBed.get(ClientsRegisterService);
    expect(service).toBeTruthy();
  });
});
