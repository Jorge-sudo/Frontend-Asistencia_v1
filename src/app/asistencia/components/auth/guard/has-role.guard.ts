
import { map, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';
import { Role } from '../api/Role';
import { Router } from '@angular/router';


export function hasRole(role: Role) {
  return () =>
    inject(AuthService).user$.pipe(
      map((user) => Boolean(user && role === user.role)),
      tap((hasRole) => {
        hasRole === false;
        inject(Router).navigateByUrl('/access');
      })
    );
}



