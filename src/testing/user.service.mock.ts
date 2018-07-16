import { of } from 'rxjs';

export class UserServiceMock {

    get(id: number) {
        return of(null);
    }

    getAll(filters) {
        return of([]);
    }
}
