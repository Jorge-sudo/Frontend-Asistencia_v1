import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HasRoleGuard } from '../auth/guard/has-role.guard';

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
        canActivate: [HasRoleGuard],
        loadChildren: () =>
          import('./toRegister/toRegister.module').then(
            (m) => m.ToRegisterModule
          ),
      },
      {
        path: 'perfil',
        loadChildren: () => import('./porfile/porfile.module').then(m => m.PorfileModule),
      },
      { path: '**', redirectTo: '/extraviado' },
    ]),
  ],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
