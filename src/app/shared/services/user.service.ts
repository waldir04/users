import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment';
import { User } from './../interfaces/user';
import { UserFilters } from './../../pages/users-page/shared/user-filters';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient
    ) { }

    get(id: number | string): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    getAll(filters: UserFilters): Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiUrl}/users`, { params: filters as any });
    }
}
