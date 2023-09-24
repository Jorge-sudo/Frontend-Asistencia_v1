import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    ruta: ActivatedRouteSnapshot,
    estado: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Verifica si el usuario tiene un token válido
    if(!this.authService.isValidToken()) {
      // Si el token no es válido, redirige al usuario a la página de inicio de sesión
      this.router.navigate(['/auth/login']).then();
      // Retorna false para evitar que el usuario acceda a la ruta protegida
      return false;
    }
    // Si el token es válido, permite que el usuario acceda a la ruta protegida
    return true;
  }

  canActivateChild(
    rutaHija: ActivatedRouteSnapshot,
    estado: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Verifica si el usuario tiene un token válido
    if(!this.authService.isValidToken()) {
      // Si el token no es válido, redirige al usuario a la página de inicio de sesión
      this.router.navigate(['/auth/login']).then();
      // Retorna false para evitar que el usuario acceda a la ruta protegida
      return false;
    }
    // Si el token es válido, permite que el usuario acceda a la ruta protegida
    return true;
  }

}
