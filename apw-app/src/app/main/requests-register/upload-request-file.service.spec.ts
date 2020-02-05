import { TestBed } from '@angular/core/testing';

import { UploadRequestFileService } from './upload-request-file.service';

describe('UploadRequestFileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadRequestFileService = TestBed.get(UploadRequestFileService);
    expect(service).toBeTruthy();
  });
});
