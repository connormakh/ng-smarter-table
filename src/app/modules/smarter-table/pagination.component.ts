import {Component, OnInit, Input, OnChanges, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  _pages = []
  _current_page = 1

  @Input() set pages(value: number) {
    this._pages = Array(value)
  }


  @Output() selectPage = new EventEmitter<number>();

  constructor() {}

  change_page(page) {
    if(page <= this._pages.length && page > 0) {
      this._current_page = page
      this.selectPage.emit(page)
    }

  }

  ngOnInit() {}

  ngOnChanges() {}

}
