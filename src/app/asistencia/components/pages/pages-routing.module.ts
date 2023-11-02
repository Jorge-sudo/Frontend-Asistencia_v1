import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'listar', loadChildren: () => import('./toList/toList.module').then(m => m.ToListModule) },
        { path: 'registrar', loadChildren: () => import('./toRegister/toRegister.module').then(m => m.ToRegisterModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
