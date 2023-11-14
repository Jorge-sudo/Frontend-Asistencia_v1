import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        { path: 'acceso_denegado', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
        { path: 'acceso', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: '**', redirectTo: '/not_found' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
