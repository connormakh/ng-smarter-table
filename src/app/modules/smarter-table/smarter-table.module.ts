import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmarterTableComponent } from './smarter-table.component';
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {FormsModule} from "@angular/forms";
import {PaginationComponent} from "./pagination.component";
import {DownloadCsvService} from "./download-csv.service";
import {InlineEditComponent} from "./inline-edit/inline-edit.component";
import { MultiselectDropdownModule } from 'ng2-multiselect';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFontAwesomeModule,
    MultiselectDropdownModule
  ],
  declarations: [SmarterTableComponent, PaginationComponent, InlineEditComponent],
  exports: [SmarterTableComponent],
  providers: [DownloadCsvService]
})
export class SmarterTableModule { }
