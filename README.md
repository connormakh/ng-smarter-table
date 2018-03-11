# NgSmarterTable

An Angular 5 smart table that handles filtering, sorting, inline editing, deleting, and more!

# Installation

For now, this table only supports bootstrap.

### NPM
```sh
  npm install ng-smarter-table
```
 
* Make sure you have the bootstrap css, along with fontawesome installed in your project.
If not, add the following css links to your index.html in the root of your project.

  As per the [Boostrap](https://getbootstrap.com/docs/3.3/getting-started/) Docs:
  
  As per the [FontAwesome](https://fontawesome.com/get-started/web-fonts-with-css) Docs:

  ```html
  <!-- index.html -->
  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" 
  integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
   crossorigin="anonymous">
  <!-- fontawesome -->
   <link href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" rel="stylesheet"> 
  ```
* Add SmarterTableModule to your Module file:
  ```typescript
  @NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      SmarterTableModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  ```

## Usage

* Add smarter table to your html component, specifying your rows and columns, at least:

  ```html
    <smarter-table
          [columns]="columns"
          [rows]="rows">
    </smarter-table>
  ```
  Example on columns and rows:
  
  ```typescript
  columns = [
      {type: 'text', name: 'First Name', binder: 'fname' },
      {type: 'text', name: 'Last Name', binder: 'lname' },
      {type: 'text', name: 'Date of birth', binder: 'dob' },
      {type: 'number', name: 'numbers', binder: 'nums' },
      {type: 'text', name: 'Gender', binder: 'gender' },
    ]
  
  rows = [
    {fname: "Connor", lname: 'Makhlouta', dob: "24/5/1996", nums: 414, gender: "male"},
    {fname: "George", lname: 'Rattel', dob: '4/15/11996', nums: 4414, gender: "male"},
    {fname: "Sabrina", lname: 'Azar', dob: '16/1/1997', nums: 4414, gender: "female"},
  ]
  ```
  
  ### Column
  
  | Attribute   |   Values | Description    
  | --- | --- | --- |
  | type | 'text'/'number' | Type of the column to be stored, used in identifying for sort and filter
  | name | any | Name to be shown on column
  | binder | any | Property name in row for this column to be bound to
  
  ## Additional Features
  
  Smarter Table supports filtering, sorting, pagination, inline editing, and exporting to excel.
  
  * Sorting:
    Depending on the type given in the column, the sort will execute, whether a number or string
  
  * Filtering:
    Depending on the type given in the column, a filter can be used, whether number or string
   
  * Pagination:
    Depending on a page length specified, different page sizes can be given
  
  * Export to Excel:
    Speaks for itslef
    
  * Inline editing: 
    If enabled, user can edit a record inline, while specifying a function in order to be run on save, in case of updating an external source. 
    User is then urged to refresh data source
  
  ## Inputs
  
  | Attribute   | Type  | Default | Description      
    | --- | --- | --- | --- |
    | filter | Boolean | false | Whether or not to enable filter
    | can_delete | Boolean | false | Whether or not to show a delete button 
    | can_edit | Boolean | false | Whether or not to show a edit button 
    | on_edit | Function | null | Function to be executed on edit click 
    | on_delete | Function | null | A delete function to be executed when user clicks delete 
    | inline_edit | Boolean | false | Whether or not a user should be able to inline edit on the table
    | inline_edit_group | array | [] | Description of inline edit types to be used. Dropdown/text
    | pagination | Boolean | false | Whether or not to enable pagination in the table
    | page_size | Number | null | Page size in case pagination is enabled
    | on_save | Function | null | Function be run on when a user clicks save for inline edit
    | on_cancel | Function | null | Function be run on when a user clicks cancel for inline edit
    | can_export | boolean | false | Whether or not data can be exported to excel
    | on_row_click | Function | null | Function to handle user row clicks

   An example of inline_edit_group can be seen below:
   ```typescript
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
    ```
    
## Dependancies
   
   This project makes use of the [ng2-multiselect](https://www.npmjs.com/package/ng2-multiselect) library created by [preetham1290](https://www.npmjs.com/~preetham1290).
    
## Example code
Example code can be found in the [Smarter Table Module](https://github.com/connormakh/ng-smarter-table/tree/master/src/app/modules/smarter-table)    

## Live Demo
TODO

