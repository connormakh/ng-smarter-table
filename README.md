# NgSmarterTable

An Angular 5 smart table that handles filtering, sorting, inline editing, deleting, and more!

# Installation

For now, this table only supports bootstrap.
 
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
  
  Smarter Table 
  
  

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
