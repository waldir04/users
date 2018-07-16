import { Component, OnInit } from '@angular/core';

import { environment } from './../../../environments/environment';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
    collapse: boolean;
    logoUrl: string;

    constructor() {
        this.collapse = true;
        this.logoUrl = `${environment.imgUrl}/themes/base/logos/logo.png`;
    }

    ngOnInit() {
    }

    toggle() {
        this.collapse = !this.collapse;
    }
}
