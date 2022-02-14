import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";

const MODULES = [
  CommonModule,
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatSelectModule
];

@NgModule({
  declarations: [],
  imports: MODULES,
  exports: MODULES
})
export class LayoutModule { }
