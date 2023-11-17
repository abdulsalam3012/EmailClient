import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EmailResponse } from '../Interfaces/email-response';
import { EMPTY, Observable, catchError } from 'rxjs';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<EmailResponse>{

  constructor(private _emailService: EmailService,private _router:Router) { }
  resolve(route: ActivatedRouteSnapshot){
    const { id } = route.params;
		return this._emailService.getEmailId(id).pipe(
      catchError(()=>{
        this._router.navigateByUrl('/inbox/notfound');
        return EMPTY;
      })
    );
  }
}
