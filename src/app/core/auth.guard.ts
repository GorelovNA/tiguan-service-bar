import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(): boolean {
    if (!this.authService.isAuthorized()) {
      this.router.navigate(['/login']);
    }

    return this.authService.isAuthorized();
  }
}
