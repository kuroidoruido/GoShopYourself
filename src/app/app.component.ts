import { Component } from '@angular/core';
import { OneStoreManagerService } from './one-store-manager.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(public oneStoreMgr: OneStoreManagerService) {}
}
