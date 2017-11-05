import { Component } from '@angular/core';
import {LanguageService} from "./language.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [LanguageService],
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
}
