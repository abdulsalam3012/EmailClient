import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatchPassword } from '../Validators/match-password';
import { UniqueUsername } from '../Validators/unique-username';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  authForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _matchPassword: MatchPassword,
    private _uniqueNameValidation: UniqueUsername,
    private _authService: AuthService,
    private _route: Router
  ) { }

  ngOnInit(): void {
    this.authForm = this._fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-z0-9]+$/)
      ], [this._uniqueNameValidation.validate]],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]],
      passwordConfirmation: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]]
    }, { validators: [this._matchPassword.validate] })
  }
  onSubmit() {
    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    }
    // if (this.authForm.valid) {
      var payload = this.authForm.value;
      this._authService.signUp(this.authForm.value).subscribe({
        next: response => {
          this._route.navigateByUrl('/inbox');
        },
        error: err => {
          if (!err.status) {
            this.authForm.setErrors({ noConnection: true });
          } else {
            this.authForm.setErrors({ unknownError: true });
          }
        }
      });
   //}

  }
}
