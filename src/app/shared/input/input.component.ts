import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
@Input() label:string;
@Input() control:FormControl;
@Input() placeholder:string;
@Input() inputType:string;
@Input() inputControlType='input';

  constructor() { }

  ngOnInit(): void {
  }

}
