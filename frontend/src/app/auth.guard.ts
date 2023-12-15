/* The AuthGuard class is an Angular route guard that checks if a user is authenticated and redirects
them to the login page if not. */
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Verifica si el usuario está autenticado
    if (this.userService.isLoggedIn()) {
      return true;
    }

    // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    this.router.navigate(['/login']);
    return false;
  }
}
