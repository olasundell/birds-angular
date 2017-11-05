import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Region, RegionService} from "./region.service";

@Component({
    selector: 'app-region',
    template: `
        <div *ngIf="regionService.regions">
            Region:
            <select name="region" [compareWith]="regionService.byCode" [(ngModel)]="regionService.currentRegion">
                <option *ngFor="let region of regionService.regions" (change)="onChange(region)" [ngValue]="region">
                    {{region.name}}
                </option>
            </select>
        </div>
    `
})

export class RegionComponent {
    onChange(region: Region) {
        console.log(region);
        this.regionService.currentRegion = region;
    }

    constructor(public regionService: RegionService) { }
}
