import { Component, OnInit } from '@angular/core';
import { EmailResponse } from '../Interfaces/email-response';
import { AuthService } from 'src/app/auth/Services/auth.service';
import { EmailService } from '../Service/email.service';
declare var $: any;
@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.scss']
})
export class EmailCreateComponent implements OnInit {
  isComposeEmail = true;
  email: EmailResponse;
  userName: string;
  constructor(private _authService: AuthService, private _emailService: EmailService) {
    this.userName = this._authService.username;
    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: this.userName + '@angular-email.com',
    }
  }

  ngOnInit(): void {
    this.composeEmail();
  }
  composeEmail() {
    this.isComposeEmail = !this.isComposeEmail;
  }
  onSubmit(email: EmailResponse) {
    this._emailService.sentEmail(email).subscribe(() => {
      this.isComposeEmail = false;
    })
  }

}
