import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { UsersPageComponent } from './users-page.component';
import { UsersPageRoutingModule } from './users-page-routing.module';
import { UserService } from './../../shared/services/user.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UsersPageRoutingModule
    ],
    declarations: [
        UsersPageComponent
    ],
    providers: [
        UserService
    ],
    exports: [
    ]
})
export class UsersPageModule { }
