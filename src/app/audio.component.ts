import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-audio',
    templateUrl: './audio.component.html',
    styleUrls: ['./audio.component.css']
})

export class AudioComponent {
    // url = 'http://www.xeno-canto.org/sounds/uploaded/CJQNNUYOQE/XC389364-rc_54_Pica_pica_edited.mp3';
    @Input() url: string;

    // constructor(public url: string) {
    //     this.url = url;
    // }
}
