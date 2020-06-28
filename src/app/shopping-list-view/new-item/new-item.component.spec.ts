import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';

import { ShoppingListState } from 'src/app/store/shopping-list.state';
import { NewItemComponent } from './new-item.component';

describe('NewItemComponent', () => {
    let component: NewItemComponent;
    let fixture: ComponentFixture<NewItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NewItemComponent],
            imports: [NgxsModule.forRoot([ShoppingListState])],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
