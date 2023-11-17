import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmailListResponse } from '../Interfaces/email-list-response';
import { EmailResponse } from '../Interfaces/email-response';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private _http: HttpClient) { }

  getEmails() {
    return this._http.get<EmailListResponse[]>(environment.emaiBaseUrl + "emails");
  }
  getEmailId(emailId: string) {
    return this._http.get<EmailResponse>(environment.emaiBaseUrl + "emails/" + emailId);
  }
  sentEmail(email: EmailResponse) {
    return this._http.post(environment.emaiBaseUrl + "emails", email);
  }
}
