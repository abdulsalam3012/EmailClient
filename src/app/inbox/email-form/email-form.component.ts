import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmailResponse } from '../Interfaces/email-response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent implements OnInit {
  emailForm:FormGroup;
  @Input() email: EmailResponse;
  @Output() newEmail= new EventEmitter();
  constructor(private _fb:FormBuilder) { }

  ngOnInit(): void {
    const {subject,from,to,text} = this.email;
    this.emailForm = this._fb.group({
      to:[to,[Validators.required,Validators.email]],
      from:[{value:from,disabled:true}],
      text:[text,[Validators.required]],
      subject:[subject,[Validators.required]],
    })
    
  }
  onSubmit() {
    if(this.emailForm.invalid){
      return;
    }
    this.newEmail.emit(this.emailForm.value);
  }

}
