import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmarterTableComponent } from './smarter-table.component';

describe('SmarterTableComponent', () => {
  let component: SmarterTableComponent;
  let fixture: ComponentFixture<SmarterTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmarterTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmarterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
