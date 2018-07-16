import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of, Subject, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { UsersPageComponent } from './users-page.component';
import { UserService } from './../../shared/services/user.service';
import { UserServiceMock } from './../../../testing/user.service.mock';

describe('UsersPageComponent', () => {
    let component: any;
    let fixture: ComponentFixture<UsersPageComponent>;
    let users;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                UsersPageComponent
            ],
            imports: [
                FormsModule,
                RouterTestingModule
            ],
            providers: [
                {
                    provide: UserService,
                    useClass: UserServiceMock
                }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        users = [{
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
        }];

        fixture = TestBed.createComponent(UsersPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load the list of users on start', () => {
        spyOn((component as any), 'getUsers').and.returnValue(of(users));
        spyOn((component as any), 'liveSearch');
        component.ngOnInit();
        expect((component as any).getUsers).toHaveBeenCalled();
        expect(component.users).toEqual(users);
    });

    it('should set the http code error when server fails on start', () => {
        const codeError = 500;
        spyOn((component as any), 'getUsers').and.returnValue(throwError({ status: codeError }));
        spyOn((component as any), 'liveSearch');
        component.ngOnInit();
        expect(component.statusError).toEqual(codeError);
    });

    it('should initialize the live search on start', () => {
        spyOn((component as any), 'getUsers').and.returnValue(of([]));
        spyOn((component as any), 'liveSearch');
        component.ngOnInit();
        expect(component.liveSearch).toHaveBeenCalled();
    });

    it('should set filters with the correct values', () => {
        let result;
        const expectedData = { name: 'test' };
        component.filters = { id: '', name: 'test' };
        result = (component as any).getFilters();
        expect(result).toEqual(expectedData);
    });

    it('should get all users', () => {
        spyOn((component as any), 'getFilters').and.returnValue({});
        spyOn(component.userService, 'getAll').and.returnValue(of([]));
        (component as any).getUsers();
        expect(component.userService.getAll).toHaveBeenCalled();
        expect(component.loading).toBeFalsy();
    });

    it('should filter with live search', fakeAsync(() => {
        spyOn((component as any), 'getUsers').and.returnValue(of(users));
        (component as any).liveSearch();
        component.term$.next('filter');
        tick(400);
        expect((component as any).getUsers).toHaveBeenCalled();
        expect(component.users).toEqual(users);
    }));

    it('should set the http code error when server fails on live search', fakeAsync(() => {
        const codeError = 404;
        spyOn((component as any), 'getUsers').and.returnValue(throwError({ status: codeError }));
        (component as any).liveSearch();
        component.term$.next('filter');
        tick(400);
        expect(component.statusError).toEqual(codeError);
    }));
});
