import { Component, OnInit } from '@angular/core';
import {
    debounceTime,
    distinctUntilChanged,
    map,
    switchMap,
    finalize
} from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ServerError } from './../../shared/interfaces/server-error';
import { User } from './../../shared/interfaces/user';
import { UserFilters } from './shared/user-filters';
import { UserService } from './../../shared/services/user.service';

@Component({
    selector: 'app-users-page',
    templateUrl: './users-page.component.html',
    styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
    filters: UserFilters;
    loading: boolean;
    statusError: number;
    statusErrors: Object;
    term$: Subject<string>;
    users: User[];

    constructor(
        private userService: UserService
    ) {
        this.filters = {};
        this.loading = true;
        this.statusError = null;
        this.statusErrors = ServerError;
        this.term$ = new Subject<string>();
        this.users = [];
    }

    ngOnInit() {
        this.liveSearch();
        this.getUsers()
        .subscribe(
            (users: User[]) => this.users = users,
            (error) => this.statusError = error.status
        );
    }

    private getFilters() {
        const filters = Object.assign({}, this.filters);
        let filter;

        for (filter of Object.keys(filters)) {
            if (!filters[filter]) {
                delete filters[filter];
            }
        }

        return filters;
    }

    private getUsers() {
        const filters = this.getFilters();

        return this.userService.getAll(filters)
        .pipe(
            finalize(() => this.loading = false)
        );
    }

    private liveSearch() {
        this.term$
        .pipe(
            debounceTime(400),
            distinctUntilChanged(),
            switchMap((term) => this.getUsers() )
        )
        .subscribe(
            (users: User[]) => this.users = users,
            (error) => this.statusError = error.status
        );
    }
}
