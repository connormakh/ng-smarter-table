import {Component, OnInit, Input, OnChanges, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'inline-edit',
  templateUrl: './inline-edit.component.html'
  // styleUrls: ['./.component.scss']
})
export class InlineEditComponent implements OnInit, OnChanges {

  _type = 'text'
  _options = []

  @Input() set type(value: string) {
    this._type = value
  }

  @Input() set options(value: any) {
    this._options= value
  }


  constructor() {}


  ngOnInit() {}

  // ngOnChanges() {
  //   switch (this._type) {
  //     case 'text':
  //
  //   }
  // }

}