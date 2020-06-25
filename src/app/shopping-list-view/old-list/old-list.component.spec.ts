import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldListComponent } from './old-list.component';

describe('OldListComponent', () => {
    let component: OldListComponent;
    let fixture: ComponentFixture<OldListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OldListComponent],
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
