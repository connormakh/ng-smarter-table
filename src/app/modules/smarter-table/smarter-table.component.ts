import {Component, OnInit, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'smarter-table',
  templateUrl: './smarter-table.component.html',
  styleUrls: ['./smarter-table.component.css']
})
export class SmarterTableComponent implements OnInit, OnChanges {

  _filter = false
  _sort = false
  data = []
  _columns = []
  _rows = []
  _initial_rows = []

  _can_edit = false
  _can_delete = false
  _page_size = 0
  _pagination = false

  _pages = 0
  _current_page = 1

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

  @Input() set can_edit(value: boolean) {
    this._can_edit = value
  }

  @Input() set can_delete(value: boolean) {
    this._can_delete = value
  }

  @Input() set pagination(value: boolean) {
    this._pagination = value
  }

  @Input() set page_size(value: number) {
    this._page_size = value
  }

  @Input()
  public on_edit: Function;

  @Input()
  public on_delete: Function;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    // checkForAction()
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
    if(this._pagination && this._page_size) {
      let added = this.data.length % this._page_size ? 1 : 0
      this._pages = Math.floor(this.data.length / this._page_size) + added
      this.data = this.data.slice((this._current_page - 1) * this._page_size, ((this._current_page - 1) * this._page_size) + this._page_size )
    }
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

  exportToExcel() {
    let csv_string = ''
    for (let col of this._columns) {
      csv_string += col.name + ","
    }
    csv_string += "\n"

    for(let d of this.data) {
      for (let r of d)
        csv_string += r +","
      csv_string += "\n"
    }
    // TODO SAVE AS FILE
  }

  onSelectPage(page) {
    this._current_page = page
    this.matchDataToColumns()
  }

  // checkForAction() {
  //   if(this._can_delete || this._can_edit) {
  //     this._columns.concat({type: 'nofilter', name: 'Action', binder: 'action'})
  //     this._rows.map(item => {
  //       item['action'] = 'editdelete'
  //     })
  //   }
  // }


}
