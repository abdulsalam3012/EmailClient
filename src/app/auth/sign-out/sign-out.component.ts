import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {

  constructor(private _authservice: AuthService, private _route: Router) { }

  ngOnInit(): void {
  this.signOut();
  }
  signOut(){
    this._authservice.signout().subscribe(() => {
      this._route.navigateByUrl('/auth/signin');
      console.log("redirection_completed");
    });
  }

}
