import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';

import { provideOneStoreManagerService } from 'src/app/one-store-manager.service.mock.spec';
import { ShoppingListState } from 'src/app/store/shopping-list.state';
import { CurrentListComponent } from './current-list.component';

describe('CurrentListComponent', () => {
    let component: CurrentListComponent;
    let fixture: ComponentFixture<CurrentListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CurrentListComponent],
            imports: [NgxsModule.forRoot([ShoppingListState])],
            providers: [provideOneStoreManagerService()],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CurrentListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
