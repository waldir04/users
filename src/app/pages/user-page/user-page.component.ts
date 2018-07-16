import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { ServerError } from './../../shared/interfaces/server-error';
import { User } from './../../shared/interfaces/user';
import { UserService } from './../../shared/services/user.service';

@Component({
    selector: 'app-user-page',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
    id: number | string;
    loading: boolean;
    statusError: number;
    statusErrors: Object;
    user: User;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService
    ) {
        this.id = this.route.snapshot.params.id;
        this.loading = true;
        this.statusError = null;
        this.statusErrors = ServerError;
        this.user = null;
    }

    ngOnInit() {
        this.getUser();
    }

    private getUser() {
        this.userService.get(this.id)
        .pipe(
            finalize(() => this.loading = false)
        )
        .subscribe(
            (user: User) => this.user = user,
            (error) => this.statusError = error.status
        );
    }

}
