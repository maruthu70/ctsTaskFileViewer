import { Component, ElementRef, isDevMode,ChangeDetectorRef  } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  isFileUploaded = false;
  env = '';
  constructor(private elRef: ElementRef,private cdRef:ChangeDetectorRef) {

  }

  ngOnInit() {
    this.env = isDevMode() ? 'Development' : 'Production'
  }

  uploadFile() { // Invoke pop up window to select file
    let ele = this.elRef.nativeElement;
    this.tableHeaders = [], this.tableRows = [];
    $(ele).find('#fileSelector').trigger('click');

  }

  isFilterRequired = false; minIssueCount = null;
  filter(weKDetails) {  // Retrive lowest minimul count value
    if (weKDetails.target.checked) {
      this.isFilterRequired = true;
      this.minIssueCount = (this.minArrayValue(this.filterContent));
    }
    else if (!weKDetails.target.checked) {
      this.isFilterRequired = false;
    }
  }

  validate(value) {  // Filter - to Display minimul issue count row
    return value['Issue count'] == this.minIssueCount;
  }

  minArrayValue(array) {
    return Math.min.apply(Math, array);
  };

  tableHeaders = []; tableRows = []; refill; filterContent = [];
  onSelectFile(selectedFile) { // Excel Reader 
    this.filterContent = [];
    if (selectedFile && selectedFile.length > 0) {
      let file: File = selectedFile.item(0);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let fileNew: string = reader.result.split('"').join('');
        let tRows = fileNew.split(/\r|\n|\r/);
        this.tableHeaders = tRows[0].split(','); // Split the multi headers and store into Array
        for (let i = 1; i < tRows.length; i++) {
          let rowsA = tRows[i].split(',');
          if (rowsA.length === this.tableHeaders.length) {
            let eachRow = {};
            for (let secondrayArray = 0; secondrayArray < this.tableHeaders.length; secondrayArray++) {
              eachRow[this.tableHeaders[secondrayArray]] = rowsA[secondrayArray].split('"').join('');
              if (this.tableHeaders[secondrayArray] == "Issue count") {
                this.filterContent.push(rowsA[secondrayArray].split('"').join(''));
              }
            }
            this.tableRows.push(eachRow);
          }
        }
      }
    }
    this.isFileUploaded = true; this.refill = '';
  }


  ngOnDestroy() {
    //this.cdRef.detach(); 

    if (!this.cdRef['destroyed']) {
      this.cdRef.detectChanges();
  }
  }

}
