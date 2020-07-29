import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { provideOneStoreManagerService } from 'src/app/one-store-manager.service.mock.spec';
import { SettingsComponent } from './settings.component';
import { NgxsModule } from '@ngxs/store';

describe('SettingsComponent', () => {
    let component: SettingsComponent;
    let fixture: ComponentFixture<SettingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SettingsComponent],
            imports: [NgxsModule.forRoot()],
            providers: [provideOneStoreManagerService()],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
