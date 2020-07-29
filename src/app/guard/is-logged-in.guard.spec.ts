import { TestBed } from '@angular/core/testing';

import { IsLoggedInGuard } from './is-logged-in.guard';
import { NgxsModule } from '@ngxs/store';

describe('IsLoggedInGuard', () => {
    let guard: IsLoggedInGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot()],
        });
        guard = TestBed.inject(IsLoggedInGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
