import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { UserPageComponent } from './user-page.component';
import { UserService } from './../../shared/services/user.service';
import { UserServiceMock } from './../../../testing/user.service.mock';

describe('UserPageComponent', () => {
    let component: any;
    let fixture: ComponentFixture<UserPageComponent>;
    let user;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                UserPageComponent
            ],
            imports: [
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

        fixture = TestBed.createComponent(UserPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load the user information on start', () => {
        spyOn(component, 'getUser');
        component.ngOnInit();
        expect(component.getUser).toHaveBeenCalled();
    });

    it('should load the user information', () => {
        spyOn(component.userService, 'get').and.returnValue(of(user));
        (component as any).getUser();
        expect(component.loading).toBeFalsy();
        expect(component.user).toEqual(user);
    });

    it('should set the http code error when server fails', () => {
        const codeError = 404;
        spyOn(component.userService, 'get').and.returnValue(throwError({ status: codeError }));
        (component as any).getUser();
        expect(component.loading).toBeFalsy();
        expect(component.statusError).toEqual(codeError);
    });
});
