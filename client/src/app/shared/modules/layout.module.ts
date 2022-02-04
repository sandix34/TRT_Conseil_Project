import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';

const MODULES = [
  CommonModule,
  MatToolbarModule,
];

@NgModule({
  declarations: [],
  imports: MODULES,
  exports: MODULES
})
export class LayoutModule { }
