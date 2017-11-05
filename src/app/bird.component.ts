import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Language, LanguageService} from './language.service';
import {Region, RegionService} from "./region.service";
import {Subject} from "rxjs/Subject";

@Component({
    selector: 'app-bird',
    templateUrl: './bird.component.html',
    styleUrls: ['./bird.component.css']
})
export class BirdComponent implements OnInit {

    response: Response;
    clicked: boolean;

    // Inject HttpClient into your component or service.
    constructor(private http: HttpClient, public languageService: LanguageService, public regionService: RegionService) {
        this.clicked = false;
    }

    ngOnInit(): void {
        this.fetchBird();
    }

    private fetchBird() {
        this.fetchFromServer(this.languageService.currentLanguage, this.regionService.currentRegion);
        // this.languageService.langChange.asObservable().subscribe((next) => {
        //     this.fetchFromServer(next, region);
        // });
    }

    isCorrectAndClicked(bird: Bird): boolean {
        const b = this.clicked && bird.scientificName === this.response.actualBird.scientificName;
        // console.log('isCorrectAndClicked? ' + b);
        return b;
    }

    onSelect(bird: Bird) {
        console.log('Clicked bird ' + bird.scientificName);
        if (this.clicked) {
            this.clicked = false;
            this.fetchBird();
        } else {
            this.clicked = true;
        }
    }

    private fetchFromServer(lang: Language, region: Region) {
        let params: HttpParams = new HttpParams();
        if (lang) {
            params = params.append('lang', lang.name.toLowerCase());
        }

        if (region) {
            params = params.append('region', region.code);
        }

        // console.log(`Fetching new bird with language ${lang.name}`);
        console.log(params);

        this.http.get<Response>('http://localhost:8080/random', {
            params: params
        }).subscribe(data => {
                // Read the result field from the JSON response.
                console.log(data);
                this.response = data;
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

interface Response {
    media: Media;
    actualBird: Bird;
    genusBirds: Bird[];
}

interface Media {
    mediaType: string;
    url: string;
}

interface Bird {
    scientificName: string;
    genusName: string;
    name: string;
}
