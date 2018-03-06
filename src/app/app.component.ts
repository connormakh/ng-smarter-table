import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  columns = [
    {type: 'number', name: 'Cool Nums', binder: 'nums' },
    {type: 'text', name: 'Cool Strings', binder: 'strs' },
    {type: 'number', name: 'Cool Nums', binder: 'nums2' },
    {type: 'number', name: 'Cool Nums', binder: 'nums3' },
    {type: 'number', name: 'Cool Nums', binder: 'nums4' },
    ]

  rows = [
    {nums: 5, strs: 'ayooyod', nums2: 33, nums3: 414, nums4: 535},
    {nums: 5, strs: 'cyooyoa', nums2: 323, nums3: 4344, nums4: 255},
    {nums: 5, strs: 'xyooyog', nums2: 65, nums3: 39, nums4: 155},
    {nums: 5, strs: 'yooyoge', nums2: 3, nums3: 45, nums4: 955}
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
