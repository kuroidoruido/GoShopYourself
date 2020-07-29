import { TestBed } from '@angular/core/testing';

import { provideMockOneStore } from 'src/app/one-store/testing';

import { OneStoreManagerService } from './one-store-manager.service';
import { NgxsModule } from '@ngxs/store';

describe('OneStoreManagerService', () => {
    let service: OneStoreManagerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot()],
            providers: [provideMockOneStore()],
        });
        service = TestBed.inject(OneStoreManagerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
