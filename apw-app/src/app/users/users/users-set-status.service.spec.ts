import { TestBed } from '@angular/core/testing';

import { UsersSetStatusService } from './users-set-status.service';

describe('UsersSetStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersSetStatusService = TestBed.get(UsersSetStatusService);
    expect(service).toBeTruthy();
  });
});
