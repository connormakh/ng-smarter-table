import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmarterTableComponent } from './smarter-table.component';
import {AngularFontAwesomeModule} from "angular-font-awesome";

@NgModule({
  imports: [
    CommonModule,
    AngularFontAwesomeModule
  ],
  declarations: [SmarterTableComponent],
  exports: [SmarterTableComponent]
})
export class SmarterTableModule { }
