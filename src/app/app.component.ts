import { Component } from '@angular/core';
import {LanguageService} from './language.service';
import {RegionService} from './region.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [LanguageService, RegionService],
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
}
