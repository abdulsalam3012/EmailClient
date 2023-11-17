import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../Service/email.service';
import { switchMap } from 'rxjs';
import { EmailResponse } from '../Interfaces/email-response';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.scss']
})
export class EmailShowComponent implements OnInit {
  emailId: string;
  emailResponse: EmailResponse;

  constructor(private _activeRoute: ActivatedRoute, private _emailService: EmailService) {
    this.emailResponse = this._activeRoute.snapshot.data['email'];
    this._activeRoute.data.subscribe(({ email }) => {
      this.emailResponse = email;
    });
  }

  ngOnInit(): void {
  }

}
