import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
@Injectable({
    providedIn: 'root',
})
export class LoginPageGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }

    canActivate(): Observable<boolean> {
        return this.authService.isAuthorized$.pipe(
            tap((isAuthorized) => {
                if (isAuthorized) {
                    this.router.navigate(['/']);
                }
            }),
            map(isAuthorized => !isAuthorized)
        );
    }
}
