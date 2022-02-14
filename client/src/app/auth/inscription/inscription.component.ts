import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

interface Role {
  value: string,
  viewValue: string
}

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  public roles: Role[] = [
    {value: 'candidate', viewValue: 'Candidat'},
    {value: 'recruiter', viewValue: 'Recruteur'}
  ]

  public error!: string;

  public inscriptionForm: FormGroup = this.fb.group({
    email: [null, Validators.required],
    name: [null, Validators.required],
    password: [null, Validators.required],
    role: [null, Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
) { }

  ngOnInit(): void {}

  public submit() {
    if (this.inscriptionForm.valid) {
      this.authService.inscription(this.inscriptionForm.getRawValue()).subscribe({
        next: () => {
          this.router.navigateByUrl('/connexion').then(() => {
            console.log('redirection réussie');
          })
        },
        error: (err) => {
          this.error = err?.error || 'une erreur est survenue';
        }
      })
    }
  }
}
