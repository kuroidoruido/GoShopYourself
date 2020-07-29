import { TestBed } from '@angular/core/testing';

import { OneStoreManagerService } from './one-store-manager.service';

describe('OneStoreManagerService', () => {
  let service: OneStoreManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OneStoreManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
