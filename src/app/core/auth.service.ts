import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtEncode from "jwt-encode";
import { jwtDecode } from "jwt-decode";
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const BASIC_USER_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJwYXNzd29yZCI6InVzZXIifQ.5LEyhafrxC_XHVZh2EX6tpk-C1ow-d_dBkwnc7VODpc`;
const ADMIN_USER_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIxMDExMTAxIn0.W74Kmkftael6ji5wzBtW0cI2AGRMqN0etpdFy_3xaKg`;

export interface User {
    username: string;
    password: string;
}

export type Role = 'admin' | 'user' | 'unknown';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    userRole$: BehaviorSubject<Role> = new BehaviorSubject<Role>('unknown');

    isAuthorized$: Observable<boolean> = this.userRole$.asObservable().pipe(
        map(r => r !== 'unknown')
    );
    isAdmin$: Observable<boolean> = this.userRole$.asObservable().pipe(
        map(r => r === 'admin')
    );

    constructor(private router: Router) {
        const accessToken = localStorage.getItem('access_token') || '';

        try {
            const user: User = jwtDecode(accessToken);
            this.login(user);
        } catch (error) {
            console.error('необходимо авторизироваться на сайте');
        }
    }

    login(user: User): boolean {
        const loginSecret = 'secret';
        const loginToken = jwtEncode(user, loginSecret);

        const accessSecret = 'access';
        const accessToken = jwtEncode(user, accessSecret);

        let logined = false;

        if (loginToken === BASIC_USER_TOKEN) {
            this.userRole$.next('user');
            logined = true;
        } else if (loginToken === ADMIN_USER_TOKEN) {
            this.userRole$.next('admin');
            logined = true;
        } else {
            this.logout();
        }

        if (logined) {
            localStorage.setItem('access_token', accessToken);
        }

        return logined;
    }

    logout(): void {
        localStorage.removeItem('access_token');
        this.userRole$.next('unknown');
        this.router.navigate(['/login']);
    }
}
