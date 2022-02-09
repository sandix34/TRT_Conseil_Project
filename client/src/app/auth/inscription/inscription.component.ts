import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  public inscriptionForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {}

  public submit() {
    console.log(this.inscriptionForm.getRawValue());
  }

}
