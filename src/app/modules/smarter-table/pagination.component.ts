import {Component, OnInit, Input, OnChanges, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  _pages = 0
  _current_page = 1

  @Input() set pages(value: number) {
    this._pages = Array(value)
  }


  @Output() selectPage = new EventEmitter<number>();

  constructor() {}

  change_page(page) {
    this._current_page = page
    this.selectPage.emit(page)
  }

  ngOnInit() {}

  ngOnChanges() {}

}
