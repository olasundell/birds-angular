import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {LanguageService} from './language.service';

@Component({
    selector: 'app-bird',
    templateUrl: './bird.component.html',
    styleUrls: ['./bird.component.css']
})
export class BirdComponent implements OnInit {
    response: Response;
    clicked: boolean;

    // Inject HttpClient into your component or service.
    constructor(private http: HttpClient, public languageService: LanguageService) {
        this.clicked = false;
    }

    ngOnInit(): void {
        // Make the HTTP request:
        this.fetchBird();
    }

    private fetchBird() {
        const params: HttpParams = new HttpParams();
        params.set('lang', this.languageService.currentLanguage.name);

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

