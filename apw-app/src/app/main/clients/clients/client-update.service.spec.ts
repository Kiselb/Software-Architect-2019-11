import { TestBed } from '@angular/core/testing';

import { ClientUpdateService } from './client-update.service';

describe('ClientUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientUpdateService = TestBed.get(ClientUpdateService);
    expect(service).toBeTruthy();
  });
});
