import {Component} from '@angular/core';
import {LanguageService} from './language.service';

@Component({
    selector: 'app-language',
    template: `
        <div *ngIf="languageService.languages">
            Language:
            <select name="language" [compareWith]="languageService.byCode" [(ngModel)]="languageService.currentLanguage">
                <option *ngFor="let lang of languageService.languages" [ngValue]="lang">
                    {{lang.name}}
                </option>
            </select>
        </div>
    `
    // templateUrl: './language.component.html'
})


export class LanguageComponent {
    // languages: Language[];
    // currentLanguage: Language;

    constructor(public languageService: LanguageService) {
        // this.currentLanguage = languageService.currentLanguage;
        // this.languages = this.languageService.languages;
    }


}

