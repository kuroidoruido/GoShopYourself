import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HeaderModule } from './header/header.module';
import { AppStoreModule } from './store/app-store.module';
import { OneStoreModule } from './one-store/one-store.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AppStoreModule,
        BrowserAnimationsModule,

        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

        HeaderModule,
        OneStoreModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
