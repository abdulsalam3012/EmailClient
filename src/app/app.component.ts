import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/Services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { AppModule } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'EmailClient.UI';
  isUserSignedIn$: BehaviorSubject<boolean>;
  constructor(private _authService: AuthService) {
    this.isUserSignedIn$ = this._authService.isSignedin$;
  }
  ngOnInit(): void {
    this.checkisAuth();
  }

  checkisAuth() {
    this._authService.checkAuth().subscribe(()=>{ })
  }
  
}
