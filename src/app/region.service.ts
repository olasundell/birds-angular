import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class RegionService {
    private _regions: Region[];
    private _currentRegion: Region;
    regionChange: Subject<Region> = new Subject<Region>();

    get regions(): Region[] {
        return this._regions;
    }

    get currentRegion(): Region {
        return this._currentRegion;
    }

    set currentRegion(value: Region) {
        console.log(`Setting current region to ${value.name}`)
        if (!value) {
            return;
        }
        this._currentRegion = value;
        this.regionChange.next(value);
    }

    constructor(private http: HttpClient) {
        this.initRegions();
    }

    byCode(region1: Region, region2: Region): boolean {
        if (!region1 || !region2) {
            return false;
        }
        return region1.code === region2.code;
    }

    private initRegions() {
        // Make the HTTP request:
        this.http.get<Region[]>('http://localhost:8080/regions').subscribe(data => {
                // Read the result field from the JSON response.
                console.log(data);

                const regionMap = new Map<string, Region>();

                for (const entry of data) {
                    regionMap.set(entry.name, entry);
                }

                this._currentRegion = regionMap.get('World');
                this.regionChange.next(this._currentRegion);
                this._regions = data;
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

export interface Region {
    name: string;
    code: string;
    id: number;
}

