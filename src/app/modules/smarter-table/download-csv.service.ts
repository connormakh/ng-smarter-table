import {Injectable} from "@angular/core";
@Injectable()
export class DownloadCsvService {

  constructor() {}


  download(columns, data:any, filename:string){
    var csvData = this.convertToCSV(columns, data);
    var a: any = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url= window.URL.createObjectURL(blob);
    a.href = url;

    var isIE = /*@cc_on!@*/false || !!(<any> document).documentMode;

    if (isIE)
    {
      var retVal = navigator.msSaveBlob(blob, filename+'.csv');
    }
    else{
      a.download = filename+'.csv';
    }
    // If you will any error in a.download then dont worry about this.
    a.click();
  }

  convertToCSV(columns, rows) {
    let csv_string = ''
    for (let col of columns) {
      csv_string += col.name + ","
    }
    csv_string += "\n"

    let data = rows.map((item,i) => {
      item['index'] = i + 1
      let row = new Array(columns.length)
      for (let col in item) {
        let index = columns.findIndex(item => {
          return item.binder == col
        })
        row[index] = item[col]
      }
      return row
    })

    for(let d of data) {
      for (let r of d)
        csv_string += r +","
      csv_string += "\n"
    }

    return csv_string
  }
}
