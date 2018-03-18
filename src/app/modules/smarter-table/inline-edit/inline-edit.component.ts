import {Component, OnInit, Input, OnChanges, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'inline-edit',
  templateUrl: './inline-edit.component.html'
  // styleUrls: ['./.component.scss']
})
export class InlineEditComponent implements OnInit {

  _type = 'text'
  _options = []
  @Input() model;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() set type(value: string) {
    this._type = value
  }

  @Input() set options(value: any) {
    this._options = value
  }


  constructor() {
  }


  ngOnInit() {
  }

  emitModelChange() {
    this.modelChange.emit(this.model)
  }

  // ngOnChanges() {
  //   switch (this._type) {
  //     case 'text':
  //
  //   }
  // }

}
