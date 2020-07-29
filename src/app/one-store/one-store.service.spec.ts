import { TestBed } from '@angular/core/testing';

import { OneStoreService } from './one-store.service';

describe('OneStoreService', () => {
  let service: OneStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OneStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
