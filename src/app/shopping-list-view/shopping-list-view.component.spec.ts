import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListViewComponent } from './shopping-list-view.component';
import { NgxsModule } from '@ngxs/store';

describe('ShoppingListViewComponent', () => {
    let component: ShoppingListViewComponent;
    let fixture: ComponentFixture<ShoppingListViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShoppingListViewComponent],
            imports: [NgxsModule.forRoot([])],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShoppingListViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
