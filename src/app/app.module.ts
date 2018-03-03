import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {SmarterTableModule} from "./modules/smarter-table/smarter-table.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SmarterTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
