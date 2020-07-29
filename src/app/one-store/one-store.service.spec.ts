import { TestBed } from '@angular/core/testing';

import { OneStoreService } from './one-store.service';
import { OneStoreModule } from './one-store.module';

describe('OneStoreService', () => {
    let service: OneStoreService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [OneStoreModule],
        });
        service = TestBed.inject(OneStoreService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
