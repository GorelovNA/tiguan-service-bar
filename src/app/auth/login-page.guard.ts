import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
@Injectable({
  providedIn: 'root'
})
export class LoginPageGuard {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthorized()) {
      this.router.navigate(['/']);
    }

    return !this.authService.isAuthorized();
  }
}
