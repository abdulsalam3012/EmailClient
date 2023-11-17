import { Component, Input, OnInit } from '@angular/core';
import { EmailResponse } from '../Interfaces/email-response';
import { EmailService } from '../Service/email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.scss']
})
export class EmailReplyComponent {
  isComposeEmail = true;
  @Input() specificEmail: EmailResponse;
  constructor(private _emailService:EmailService) { }

  ngOnChanges(): void {
    this.composeEmail();
    // Formating exsiting email to reply purpose
    const text = this.specificEmail.text.replace(/\n/gi, '\n> ');
    this.specificEmail = {
      ...this.specificEmail,
      from: this.specificEmail.to,
      to: this.specificEmail.from,
      subject: 'RE:' + this.specificEmail.subject,
      text: '\n\n\n---------------' + this.specificEmail.from + 'wrote:\n>' + text,
    }
  }
  composeEmail() {
    this.isComposeEmail = !this.isComposeEmail;
  }
  onSubmit(email: EmailResponse) {
    this._emailService.sentEmail(email).subscribe(()=>{
      this.isComposeEmail = false;
    })
  }
}
