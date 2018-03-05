import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmarterTableComponent } from './smarter-table.component';
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {FormsModule} from "@angular/forms";
import {PaginationComponent} from "./pagination.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFontAwesomeModule
  ],
  declarations: [SmarterTableComponent, PaginationComponent],
  exports: [SmarterTableComponent]
})
export class SmarterTableModule { }
