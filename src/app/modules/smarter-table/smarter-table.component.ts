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
  _initial_rows = []

  @Input() set columns(vall) {
    this._columns = vall
  }

  @Input() set rows(value: any) {
    this._rows = value
    this._initial_rows = value
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
    this.data = this._rows.map((item,i) => {
      item['index'] = i + 1
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

  runSort(type, is_negative, field) {
    switch (type) {
      case 'number':
        this._rows = this._rows.sort((a,b) => {
          return is_negative ? b[field] - a[field]  : a[field] - b[field]
        })
        break
      case 'text':
        this._rows = this._rows.sort((a,b) => {

          if(is_negative) {

          } else {

          }
          return is_negative ? (b[field].toLowerCase() > a[field].toLowerCase())?1:-1
            : (a[field].toLowerCase() >  b[field].toLowerCase()?1:-1)
        })
        break
    }
    this.matchDataToColumns()
  }

  prepareSort(index) {
    if(this._columns[index]['has_sort'] && this._columns[index]['sort_is_negative']) {
      this._columns[index]['has_sort'] = false
      this._columns[index]['sort_is_negative'] = false
      return;
    } else if (this._columns[index]['has_sort']) {
      this._columns[index]['sort_is_negative'] = true
    } else {
      this._columns[index]['has_sort'] = true
      this._columns[index]['sort_is_negative'] = false
    }

    // TODO REVERT SORT TO ORIGINAL TABLE STRUC ON NO SORTS SELECTED

    this.runSort( this._columns[index]['type'],
                  this._columns[index]['sort_is_negative'],
                  this._columns[index]['binder'])
  }

  runFilter() {
    let filter = {}
    for (let column of this._columns) {

      if(column.type == 'number' && (column.min_num || column.max_num)) {
        filter[column.binder] = {min: column.min_num, max: column.max_num}
      } else if(column.filter) {
        filter[column.binder] = column.filter
      }
    }
    this._rows = this._initial_rows
    this._rows = this._rows.filter(item => {
      return this.applyFilter(filter, item)
    })
    this.matchDataToColumns()
  }

  applyFilter(filter, item) {
    // let
    let cond = true
    for(let f in filter) {
      console.log(f)
      console.log(filter)
      if(typeof filter[f] == 'string') {
        cond = cond && item[f].includes(filter[f])
      } else {
        if(filter[f].min) {
          cond = cond && (parseInt(item[f]) > parseInt(filter[f].min))
        }
        if(filter[f].max) {
          cond = cond && (parseInt(item[f]) < parseInt(filter[f].max))
        }
      }
    }
    return cond
  }

  binaryAnd(expr1, expr2) {
    return expr1 && expr2
  }
}
