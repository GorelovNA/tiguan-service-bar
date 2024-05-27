import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { BaseComponent } from '../shared/base.class';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent extends BaseComponent implements OnInit {
  form: UntypedFormGroup;

  showPassword = false;

  errorMessage: string | null = null;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    super();
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => (this.errorMessage = null));
  }

  submit(): void {
    const logined = this.authService.login({
      username: this.form.controls.username.value,
      password: this.form.controls.password.value
    });

    if (logined) {
      this.router.navigate(['/']);
    } else {
      this.errorMessage = 'неправильный логин или пароль';
    }
  }
}
