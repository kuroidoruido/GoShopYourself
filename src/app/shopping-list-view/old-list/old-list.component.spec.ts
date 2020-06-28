import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';

import { ShoppingListState } from 'src/app/store/shopping-list.state';
import { OldListComponent } from './old-list.component';

describe('OldListComponent', () => {
    let component: OldListComponent;
    let fixture: ComponentFixture<OldListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OldListComponent],
            imports: [NgxsModule.forRoot([ShoppingListState])],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OldListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
