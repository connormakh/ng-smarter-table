import {Component, OnInit, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'smarter-table',
  templateUrl: './smarter-table.component.html',
  styleUrls: ['./smarter-table.component.css']
})
export class SmarterTableComponent implements OnInit, OnChanges {

  _filter = true
  _sort = true
  data = []
  _columns = []
  _rows = []

  @Input() set columns(vall) {
    this._columns = vall
  }

  @Input() set rows(value: any) {
    this._rows = value
  }

  @Input() set filter(value: boolean) {
    this._filter = value
  }

  @Input() set sort(value: boolean) {
    this._sort = value
  }

  constructor() {}

  ngOnInit() {

  }

  ngOnChanges() {
    this._columns && this._rows ? this.matchDataToColumns() : console.log('no rows or cols')
  }

  matchDataToColumns() {
    this.data = this._rows.map(item => {
      let row = new Array(this._columns.length)
      for (let col in item) {
        let index = this._columns.findIndex(item => {
          return item.binder == col
        })
        row[index] = item[col]
      }
      return row
    })
  }

  runFilter() {

  }
}
