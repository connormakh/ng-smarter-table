import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  columns = [
    {type: 'text', visible: true, name: 'First Name', binder: 'fname' },
    {type: 'text', visible: true, name: 'Last Name', binder: 'lname' },
    {type: 'text', visible: true, name: 'Date of birth', binder: 'dob' },
    {type: 'number', visible: true, name: 'numbers', binder: 'nums' },
    {type: 'text', visible: true, name: 'Gender', binder: 'gender' },
    ]

  rows = [
    {fname: "Connor", lname: 'Makhlouta', dob: "24/5/1996", nums: 414, gender: "male"},
    {fname: "George", lname: 'Rattel', dob: '4/15/11996', nums: 4414, gender: "male"},
    {fname: "Connor", lname: 'Makhlouta', dob: "24/5/1996", nums: 414, gender: "male"},
    {fname: "Connor", lname: 'Makhlouta', dob: "24/5/1996", nums: 414, gender: "male"},
    {fname: "Connor", lname: 'Makhlouta', dob: "24/5/1996", nums: 414, gender: "male"},
    {fname: "Connor", lname: 'Makhlouta', dob: "24/5/1996", nums: 414, gender: "male"},
    {fname: "Connor", lname: 'Makhlouta', dob: "24/5/1996", nums: 414, gender: "male"},
    {fname: "Connor", lname: 'Makhlouta', dob: "24/5/1996", nums: 414, gender: "male"},
    {fname: "Connor", lname: 'Makhlouta', dob: "24/5/1996", nums: 414, gender: "male"},
    {fname: "Connor", lname: 'Makhlouta', dob: "24/5/1996", nums: 414, gender: "male"},
    {fname: "Connor", lname: 'Makhlouta', dob: "24/5/1996", nums: 414, gender: "male"},
    {fname: "Connor", lname: 'Makhlouta', dob: "24/5/1996", nums: 414, gender: "male"},
    {fname: "Connor", lname: 'Makhlouta', dob: "24/5/1996", nums: 414, gender: "male"},
    {fname: "Connor", lname: 'Makhlouta', dob: "24/5/1996", nums: 414, gender: "male"},
  ]

  inline_edit_groups = [
    {
      binder: 'nums',
      type: 'dropdown',
      options: [1,2,3,4,5]
    },
    {
      binder: 'strs',
      type: 'text'
    }
  ]

  editfn() {
    console.log('editPressed')
  }

  deletefn() {
    console.log('deletePressed')
  }
}
