import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserPageComponent } from './user-page.component';
import { UserPageRoutingModule } from './user-page-routing.module';

@NgModule({
    imports: [
        CommonModule,
        UserPageRoutingModule
    ],
    declarations: [
        UserPageComponent
    ],
    providers: [
    ],
    exports: [
        UserPageComponent
    ]
})
export class UserPageModule { }
