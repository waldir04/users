import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    {
        path: 'users',
        children: [
            {
                path: 'list',
                loadChildren: './../pages/users-page/users-page.module#UsersPageModule'
            },
            {
                path: 'edit/:id',
                loadChildren: './../pages/user-page/user-page.module#UserPageModule'
            }
        ]
    },
    {
        path: '**', redirectTo: '/users/list'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}
