import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class LanguageService {
    private _currentLanguage: Language;
    private _languages: Language[];

    langChange: Subject<Language> = new Subject<Language>();

    get languages(): Language[] {
        return this._languages;
    }

    get currentLanguage(): Language {
        return this._currentLanguage;
    }

    set currentLanguage(value: Language) {
        console.log(`Setting current language to ${value.name}`)
        if (!value) {
            return;
        }
        this._currentLanguage = value;
        this.langChange.next(value);
    }

    constructor(private http: HttpClient) {
        this.initLanguages();
    }

    byCode(lang1: Language, lang2: Language): boolean {
        console.log(`Comparing ${lang1} with ${lang2}`)
        if (!lang1 || !lang2) {
            return false;
        }

        return lang1.code === lang2.code;
    }

    initLanguages() {
        // Make the HTTP request:
        this.http.get<Language[]>('http://localhost:8080/languages').subscribe(data => {
                // Read the result field from the JSON response.
                console.log(data);

                const langMap = new Map<string, Language>();

                for (const entry of data) {
                    langMap.set(entry.name, entry);
                }

                this._currentLanguage = langMap.get('English');
                this.langChange.next(this._currentLanguage);
                this._languages = data;
            },
            (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                    // A client-side or network error occurred. Handle it accordingly.
                    console.log('An error occurred:', err.error.message);
                } else {
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                }
            }
        );
    }
}

export interface Language {
    code: string;
    name: string;
}
