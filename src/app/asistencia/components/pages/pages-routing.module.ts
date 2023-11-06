import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { hasRole } from '../auth/guard/has-role.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'listar',
        loadChildren: () =>
          import('./toList/toList.module').then((m) => m.ToListModule),
      },
      {
        path: 'registrar',
        canActivate: [hasRole('ADMIN')],
        canLoad: [hasRole('ADMIN')],
        loadChildren: () =>
          import('./toRegister/toRegister.module').then(
            (m) => m.ToRegisterModule
          ),
      },
      { path: '**', redirectTo: '/notfound' },
    ]),
  ],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
