import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

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

  public error!: string;

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
