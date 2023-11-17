import { Component, OnInit } from '@angular/core';
import { EmailService } from '../Service/email.service';

@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.scss']
})
export class EmailIndexComponent implements OnInit {
  emails = [];

  constructor(private _emailService: EmailService) { }

  ngOnInit(): void {
    this.getEmails();
  }
  getEmails() {
    this._emailService.getEmails().subscribe((emails) => {
      this.emails = emails;
    });
  }
}
