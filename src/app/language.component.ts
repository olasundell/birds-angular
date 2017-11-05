import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {Language, LanguageService} from './language.service';

@Component({
    selector: 'app-language',
    template: `
        <div *ngIf="languageService.languages">
            Language:
            <select name="language" [compareWith]="languageService.byCode" [(ngModel)]="languageService.currentLanguage">
                <option *ngFor="let lang of languageService.languages" (change)="onChange(lang)" [ngValue]="lang">
                    {{lang.name}}
                </option>
            </select>
        </div>
    `
})


export class LanguageComponent implements OnChanges {
    onChange(lang: Language) {
        console.log(lang);
        this.languageService.currentLanguage = lang;
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
    }
    // languages: Language[];
    // currentLanguage: Language;

    constructor(public languageService: LanguageService) {
        // this.currentLanguage = languageService.currentLanguage;
        // this.languages = this.languageService.languages;
    }


}

