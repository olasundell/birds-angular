import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {copyStyles} from "@angular/animations/browser/src/util";

@Component({
    selector: 'app-bird',
    templateUrl: './bird.component.html',
    styleUrls: ['./bird.component.css']
})
export class BirdComponent implements OnInit {
    response: Response;
    clicked: boolean;

    // Inject HttpClient into your component or service.
    constructor(private http: HttpClient) {
        this.clicked = false;
    }

    ngOnInit(): void {
        // Make the HTTP request:
        this.http.get<Response>('http://localhost:8080/random').subscribe(data => {
            // Read the result field from the JSON response.
            console.log(data)
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
        console.log('isCorrectAndClicked? ' + b);
        return b;
    }

    onSelect(bird: Bird) {
        console.log('Clicked bird ' + bird.scientificName);
        if (this.clicked) {
            window.location.reload();
        } else {
            this.clicked = true;
        }
    }
}

interface Response {
    pictureUrl: string;
    actualBird: Bird;
    genusBirds: Bird[];
}

interface Bird {
    scientificName: string;
    genusName: string;
    name: string;
}
