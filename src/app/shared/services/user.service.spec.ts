import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { environment } from './../../../environments/environment';
import { UserService } from './user.service';

describe('UserService', () => {
    let httpMock;
    let user;
    let users;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                UserService
            ]
        });

        httpMock = TestBed.get(HttpTestingController);
        user = {
            id: 1,
            name: 'Leanne Graham',
            username: 'Bret',
            email: 'Sincere@april.biz',
            address: {
                street: 'Kulas Light',
                suite: 'Apt. 556',
                city: 'Gwenborough',
                zipcode: '92998-3874',
                geo: {
                    lat: '-37.3159',
                    lng: '81.1496'
                }
            },
            phone: '1-770-736-8031 x56442',
            website: 'hildegard.org',
            company: {
                name: 'Romaguera-Crona',
                catchPhrase: 'Multi-layered client-server neural-net',
                bs: 'harness real-time e-markets'
            }
        };

        users = [user];
    });

    it('should be created', inject([UserService], (service: UserService) => {
        expect(service).toBeTruthy();
    }));

    it('should get all users', inject([UserService], (service: UserService) => {
        service.getAll({})
        .subscribe((usersList) => {
            expect(request.request.method).toEqual('GET');
            expect(usersList).toEqual(users);
        });

        const request = httpMock.expectOne(`${environment.apiUrl}/users`);
        request.flush(users);
    }));

    it('should get a specific user', inject([UserService], (service: UserService) => {
        const userId = 1;

        service.get(userId)
        .subscribe((userData) => {
            expect(request.request.method).toEqual('GET');
            expect(userData).toEqual(user);
        });

        const request = httpMock.expectOne(`${environment.apiUrl}/users/${userId}`);
        request.flush(user);
    }));
});
