import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatchPassword } from '../Validators/match-password';
import { UniqueUsername } from '../Validators/unique-username';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: any;
  errorMessage = "";

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-z0-9]+$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]],

    })
  }
  onSubmit() {
    this.errorMessage = "";
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    // if (this.loginForm.valid) {
    var payload = this.loginForm.value;
    this._authService.signIn(payload).subscribe({
      next: () => {
        this._authService.isSignedin$.next(true);
        this._router.navigateByUrl('/inbox');
      },
      error: ({ error }) => {
        if (error.username || error.password) {
          this.loginForm.setErrors({ credentials: true });
        }
      }
    });
    //}

  }
}
