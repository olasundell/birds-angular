import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-region',
    template: `

        <div *ngIf="regions">
            Choose region:
            <select name="region" [compareWith]="byCode" [(ngModel)]="currentRegion">
                <option *ngFor="let region of regions" [ngValue]="region">
                    {{region.name}}
                </option>
            </select>
        </div>
    `
})

export class RegionComponent implements OnInit {
    regions: Region[];
    currentRegion: Region;
    // Inject HttpClient into your component or service.
    constructor(private http: HttpClient) { }

    byCode(region1: Region, region2: Region): boolean {
        if (!region1 || !region2) {
            return false;
        }
        return region1.code === region2.code;
    }

    ngOnInit(): void {
        // Make the HTTP request:
        this.http.get<Region[]>('http://localhost:8080/regions').subscribe(data => {
                // Read the result field from the JSON response.
                console.log(data);
                this.currentRegion = data[0];
                this.regions = data;
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

interface Region {
    name: string;
    code: string;
    id: number;
}
