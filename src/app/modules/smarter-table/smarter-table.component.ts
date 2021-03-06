import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {DownloadCsvService} from "./download-csv.service";
import {IMultiSelectSettings} from "ng2-multiselect";

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
  _inline_edit = false
  _inline_edit_groups = []
  _inline_edit_row = -1
  _can_export = false
  _inline_edit_groups_dynamic = false
  _primary_action_name = "Edit"
  _secondary_action_name = "Delete"
  _danger = ""
  _overlooking_headers = []

  editing = {}
  filterModel = []
  titles = []
  listedColumns = []

  tableWidth = '100%'

  texts = {
    checked: 'elected',
    checkedPlural: 'selected'
  }

  _actions = []

  mySettings: IMultiSelectSettings = {
    keyToSelect: "binder", //Give empty for selecting whole object
    lableToDisplay: "name",
    isSimpleArray: false
  };

  _pages = 0
  _current_page = 1

  @Input() show_options = true

  @Input() set columns(vall) {
    this._columns = vall
  }

  @Input() set actions(vall) {
    this._actions = vall
  }

  @Input() set danger(val) {
    this._danger = val
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

  @Input() set overlooking_headers(value: any) {
    this._overlooking_headers = value
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

  @Input() set inline_edit(value: boolean) {
    this._inline_edit = value
  }

  @Input() set can_export(value: boolean) {
    this._can_export = value
  }

  @Input() set primary_action_name(value: string) {
    this._primary_action_name = value
  }

  @Input() set secondary_action_name(value: string) {
    this._secondary_action_name = value
  }


  @Input() set inline_edit_groups(value: any) {
    this._inline_edit_groups = value
  }

  @Input() set inline_edit_groups_dynamic(value: boolean) {
    this._inline_edit_groups_dynamic = value
  }

  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  @Output() remove: EventEmitter<any> = new EventEmitter<any>();
  @Output() save: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() row_click: EventEmitter<any> = new EventEmitter<any>();
  @Output() action_click: EventEmitter<any> = new EventEmitter<any>();


  // @Input()
  // public on_row_click: () => any;

  // @Input()
  // public inline_edit: (row) => any;


  constructor(private csv: DownloadCsvService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    // checkForAction()
    console.log('changes')
    this._columns && this._rows ? this.matchDataToColumns() : console.log('no rows or cols')
  }

  editHandle(item, index) {
    if (this._inline_edit && this._inline_edit_groups) {
      this.editing = {}
      this._inline_edit_row = index

    } else {
      this.edit.emit({item, index})
    }
  }

  matchDataToColumns() {
    this.listedColumns = this._columns.filter(item => item.visible)
    this.data = this._rows.map((item, i) => {
      item['index'] = i + 1
      let row = {row_data: new Array(this.listedColumns.length), data: item}
      for (let col in item) {
        let index = this.listedColumns.findIndex(item => {
          return item.binder == col
        })
        row['row_data'][index] = {
          value: item[col], col: col, visible: true, columnIndex: index,
          inline_edit: this.checkInlineConditions(row, col),
          // inline_edit: this._inline_edit_groups.find(item_bind =>{
          //   return item_bind.binder == col
          // }
          // )
        }
        row['actions'] = this.checkActionConditions(row)

      }
      return row
    })
    if (this._pagination && this._page_size) {
      let added = this.data.length % this._page_size ? 1 : 0
      this._pages = Math.floor(this.data.length / this._page_size) + added
      this.data = this.data.slice((this._current_page - 1) * this._page_size, ((this._current_page - 1) * this._page_size) + this._page_size)
    }
    this.titles = this._columns
    this.filterModel = this.titleToSelect(this.listedColumns)
    this.tableWidth = 200 * (this._columns.filter(item => item.visible).length) + 'px'

    // this.toggle(this._columns.filter(item=>item.visible)
    //   .map(item2=>item2.binder))
    // this.toggle(this._columns.filter(item=>item.visible))

  }

  checkInlineConditions(row, col) {
    let inline_obj = this._inline_edit_groups[col]
    if (inline_obj && inline_obj['cases']) {
      let new_inline = JSON.parse(JSON.stringify(inline_obj))
      for (let obj of new_inline.cases) {
        let conditions_array = obj.condition.split(" ")
        switch (conditions_array[1]) {
          case "==":
            let compare_from = ""
            let compare_to = ""

            if (row.data[conditions_array[0]]) {
              compare_from = row.data[conditions_array[0]]
              if (conditions_array[2].charAt(0) == "'" && conditions_array[2].charAt(conditions_array[2].length - 1) == "'") {
                compare_to = conditions_array[2].substring(1, conditions_array[2].length - 1)
              } else if (row[conditions_array[2]]) {
                //todo
              }

              if (compare_from == compare_to) {
                new_inline.options = obj.options
                return new_inline
              }
            }
        }

      }
      return inline_obj
    } else {
      return inline_obj
    }
  }


  runSort(type, is_negative, field) {
    switch (type) {
      case 'number':
        this._rows = this._rows.sort((a, b) => {
          return is_negative ? b[field] - a[field] : a[field] - b[field]
        })
        break
      case 'text':
        this._rows = this._rows.sort((a, b) => {
          return is_negative ? (b[field].toLowerCase() > a[field].toLowerCase()) ? 1 : -1
            : (a[field].toLowerCase() > b[field].toLowerCase() ? 1 : -1)
        })
        break
    }
    this.matchDataToColumns()
  }

  prepareSort(index) {
    if (this.listedColumns[index]['has_sort'] && this.listedColumns[index]['sort_is_negative']) {
      this.listedColumns[index]['has_sort'] = false
      this.listedColumns[index]['sort_is_negative'] = false
      return;
    } else if (this.listedColumns[index]['has_sort']) {
      this.listedColumns[index]['sort_is_negative'] = true
    } else {
      this.listedColumns[index]['has_sort'] = true
      this.listedColumns[index]['sort_is_negative'] = false
    }

    // TODO REVERT SORT TO ORIGINAL TABLE STRUC ON NO SORTS SELECTED

    this.runSort(this.listedColumns[index]['type'] ? this.listedColumns[index]['type'] : 'text',
      this.listedColumns[index]['sort_is_negative'],
      this.listedColumns[index]['binder'])
  }

  runFilter() {
    let filter = {}
    for (let column of this._columns) {

      if (column.type == 'number' && (column.min_num || column.max_num)) {
        filter[column.binder] = {min: column.min_num, max: column.max_num}
      } else if (column.filter) {
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
    for (let f in filter) {
      if (typeof filter[f] == 'string') {
        cond = cond && (item[f] + "").toUpperCase().includes(filter[f].toUpperCase())
      } else {
        if (filter[f].min) {
          cond = cond && (parseInt(item[f]) > parseInt(filter[f].min))
        }
        if (filter[f].max) {
          cond = cond && (parseInt(item[f]) < parseInt(filter[f].max))
        }
      }
    }
    return cond
  }

  exportToExcel() {
    this.csv.download(this._columns, this._initial_rows, 'table')
  }

  onSelectPage(page) {
    this._current_page = page
    this.matchDataToColumns()
  }

  edit_cancel_wrapper() {
    this._inline_edit_row = -1
    this.cancel.emit()
  }

  edit_save_wrapper(data, editing, index) {
    this._inline_edit_row = -1
    this.save.emit({data, editing, index})
  }

  edit_delete_wrapper(data, index) {
    this._inline_edit_row = -1
    this.remove.emit({data, index})
  }

  row_click_wrapper(data, index) {
    if (index != this._inline_edit_row) {
      this.row_click.emit({data, index});
    }
  }

  // dynamic_inline_data(row) {
  //   // match it to an input row
  //   let formatted_row = {}
  //   for (let [i, value] of this._columns.entries()) {
  //     formatted_row[value.binder] = row[i]
  //   }
  //   return this.inline_edit(row)
  // }

  // checkForAction() {
  //   if(this._can_delete || this._can_edit) {
  //     this._columns.concat({type: 'nofilter', name: 'Action', binder: 'action'})
  //     this._rows.map(item => {
  //       item['action'] = 'editdelete'
  //     })
  //   }
  // }

  titleToSelect(titles) {
    return titles.map((currentValue) => {
      // Return element for new_array
      return currentValue.visible ? currentValue.binder : null
    })
  }

  toggle(event) {
    for (let i = 0; i < this._columns.length; i++) {
      const item = this._columns[i]
      if (event.includes(item.binder)) {
        this._columns[i].visible = true
      } else {
        this._columns[i].visible = false
      }
      for (let row of this.data) {
        if (row[i]) row[i].visible = item.visible
      }
    }
    this.matchDataToColumns()
  }

  checkForDanger(row, i) {
    return this._danger && row.data[this._danger]
  }

  // checkActionConditions(index, row) {
  //   if (this._actions[index]) {
  //     for (let obj of this._actions[index].cases) {
  //       let conditions_array = obj.condition.split(" ")
  //       switch (conditions_array[1]) {
  //         case "==":
  //           let compare_from = ""
  //           let compare_to = ""
  //
  //           if (row.data[conditions_array[0]]) {
  //             compare_from = row.data[conditions_array[0]]
  //             if (conditions_array[2].charAt(0) == "'" && conditions_array[2].charAt(conditions_array[2].length - 1) == "'") {
  //               compare_to = conditions_array[2].substring(1, conditions_array[2].length - 1)
  //             } else if (row[conditions_array[2]]) {
  //               //todo
  //             }
  //
  //             if (compare_from != compare_to) {
  //               return false
  //             }
  //           }
  //       }
  //
  //     }
  //     return true
  //   } else {
  //     return false
  //   }
  //
  // }

  checkActionConditions(row) {
    return this._actions.map(action => {
      for (let obj of action.cases) {
        let conditions_array = obj.condition.split(" ")
        // console.log(conditions_array)
        for(let i = 0; i< conditions_array.length; i++) {
          let cond = conditions_array[i]
          switch (cond) {
            case "==":
              let compare_from = ""
              let compare_to = ""

              if (row.data[conditions_array[i - 1]]) {
                compare_from = row.data[conditions_array[i - 1]]
                if (conditions_array[i + 1].charAt(0) == "'" && conditions_array[i + 1].charAt(conditions_array[i + 1].length - 1) == "'") {
                  compare_to = conditions_array[i + 1].substring(1, conditions_array[i + 1].length - 1)
                } else if (row[conditions_array[i + 1]]) {
                  //todo
                }
                // console.log(compare_from == compare_to)
                // console.log(conditions_array.includes("||"))
                // console.log(!conditions_array.includes("&&"))

                if(compare_from == compare_to && ((conditions_array.includes("||") && !conditions_array.includes("&&")) || (!conditions_array.includes("||") && !conditions_array.includes("&&")) )) {
                  return {action: action, show: true}
                }

                if (compare_from != compare_to && conditions_array.includes("&&")) {
                  return {action: action, show: false}
                }
              }
              break
            default:
              break

          }

        }

      }
      return {action: action, show: false}
    })



  }

  action_click_handler(action_name, i, j, row) {
    this.action_click.emit({action: action_name, row_index: i, action_index: j, row: row})
  }
}
