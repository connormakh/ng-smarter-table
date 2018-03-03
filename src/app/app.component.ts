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
    {nums: 5, strs: 'yooyo', nums2: 33, nums3: 44, nums4: 55},
    {nums: 5, strs: 'yooyo', nums2: 33, nums3: 44, nums4: 55},
    {nums: 5, strs: 'yooyo', nums2: 33, nums3: 44, nums4: 55},
    {nums: 5, strs: 'yooyo', nums2: 33, nums3: 44, nums4: 55}
  ]
}
