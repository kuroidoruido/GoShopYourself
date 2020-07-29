import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { provideOneStoreManagerService } from 'src/app/one-store-manager.service.mock.spec';
import { LoginPageComponent } from './login-page.component';
import { NgxsModule } from '@ngxs/store';

describe('LoginPageComponent', () => {
    let component: LoginPageComponent;
    let fixture: ComponentFixture<LoginPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginPageComponent],
            imports: [NgxsModule.forRoot()],
            providers: [provideOneStoreManagerService()],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
