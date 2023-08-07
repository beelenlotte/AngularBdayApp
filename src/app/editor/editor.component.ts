import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeColumns, Employees, ExcelEmployee } from '../shared/model';
import { ApiService } from '../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import {  catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import * as XLSX from 'xlsx';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class EditorComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = EmployeeColumns.map((col) => col.key);
  columnsSchema: any = EmployeeColumns;
  dataSource = new MatTableDataSource<Employees>();
  canBeDeleted = false;
  valid: any = {};
  public user = {
    name: 'Izzat Nadiri',
    age: 26
  }
 public toBeDeleted: any;
 public toBeDeletedID: number = 206;
 dialogOpen = false;
 public closeResult: string = '';
 uploaded = false
 @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    public apiService: ApiService, 
    private toastr: ToastrService,  
    public modalService: NgbModal,
    
    ) {}
  
  ngOnInit(): void {
    this.getEmployees()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  
  applyFilter(filterValue: any) {
    if (filterValue) {
      var filter = filterValue.target.value
      this.dataSource.filter = filter.trim().toLowerCase();
      console.log(filterValue.target.value);
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  openModal(id: number) {
    const modalRef = this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.toBeDeleted = this.apiService.getEmployee(id);
    modalRef.componentInstance.user = this.user;
    modalRef.result.then((result) => {
      if (result) {
        console.log('result',result);
      }
      
    });
    // modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
    //   console.log(receivedEntry);
    // })
  }

  getEmployees() {
    this.apiService.getEmployees().subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }
  

  editRow(row: Employees) {
    // To addnew employee 
    if (row.id === 0) {
      this.apiService.addEmployee(row).pipe(
      catchError(error => {
        if(error){
          this.showError()
          this.getEmployees()
        }
        return throwError(error);
      })
      )
      .subscribe(response => {
        this.showSuccess('added')
        this.getEmployees()
      }); 
    } 
    // To edit an employee 
    else {
      console.log('test1')
        this.apiService.updateEmployee(row).pipe(
          catchError(error => {
            if(error){
              this.showSuccess('edited')
              console.log('edited')
            }            
            return throwError(error);
          })
          
          ).subscribe(response => {
            this.showSuccess('added')
            this.getEmployees()
          }, () => (row.isEdit = false), 
            
          )
      }

    }

    cancel() {
      this.getEmployees()
    }
public  defaultdate: Date = new Date()

  addRow() {
    const newRow: Employees = {
      id: 0,
      age: 0,
      yearsOfService: 0,
      isEdit: true,
      employeeId: '0',
      firstName: '',
      lastName: '',
      address: '',
      postalCode: '',
      city: '',
      birthDay: this.defaultdate,
      startDate: this.defaultdate,
    }
    
    this.dataSource.data = [newRow, ...this.dataSource.data]
  }

  delete() { 
    this.apiService.deleteEmployee(this.idToDelete)  
    .pipe(
      catchError(error => {
        const statusCode = error.status;
        this.showError()
        return throwError(statusCode);
      })
      ).subscribe(() => {
        
        this.modalService.dismissAll(ModalContentComponent);
        this.dataSource.data = this.dataSource.data.filter(
          (u: Employees) => u.id !== this.idToDelete,
          )
          console.log('no error, 200')
          this.showSuccess('deleted');
          this.getEmployees()
    })
  }

  elementToDelete: any
  idToDelete: number = 0

  open(content: any, element: any) {
    console.log('id to delete', element)
    this.elementToDelete = element
    this.idToDelete = element.id
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
      console.log('content', content)
  }


  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {}
    }
    this.valid[id][key] = e.target.validity.valid
  }

  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false)
    }
    return false
  }

  showSuccess(action: string) {
    console.log('Succes')
  this.toastr.success('Succes, Employee is ' + action);
  }

  showError() {
    console.log('Error')
    this.toastr.error('Something went wrong!', 'Sorry');
  }

  
  name = 'This is XLSX TO JSON CONVERTER';
  willDownload = false;

  exceldata!: ExcelEmployee;
  toUpload!: Employees;
  public documentList: any[] = [];
  fileName = '';


  onFileChange(ev:  any) {
    let workBook: any = null;
    let jsonData = null;
    const reader = new FileReader();
    let file = ev.target.files[0];
    this.fileName = file.name;
    
    reader.onload = (event) => {
      const data = reader.result;

      workBook = XLSX.read(data, { type: 'binary', cellDates: true });
      jsonData = workBook.SheetNames.reduce((initial: { [x: string]: any; }, name: string | number ) => {
        const sheet = workBook.Sheets[name];
        console.log('sheet',sheet)
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      this.setDownload(dataString);
      console.log('dataString',dataString)
         this.exceldata = JSON.parse(dataString);      
     }
     this.uploaded = true;
    reader.readAsBinaryString(file);
 
  }

  uploadExcelData() {
    if(this.exceldata && this.exceldata.Sheet1) {
      for(let i=0; i<this.exceldata.Sheet1.length; i++){
        console.log(this.exceldata.Sheet1[i]); 
        let toUpload = this.exceldata.Sheet1[i]
        var employee: Employees = this.mapEmployeeJsonToEmployeeModel(toUpload)
         this.apiService.addEmployee(employee).pipe(
          catchError(error => {
            if(error){
              this.showError()
              this.getEmployees()
            }
            return throwError(error);
          })
          )
          .subscribe(response => {
            this.showSuccess('added')
            this.getEmployees()
            this.uploaded = false;
          }); 
    }
      
    }
  }

  removeFile() {
    this.uploaded = false;
  }

  mapEmployeeJsonToEmployeeModel(employeeJson: any): Employees { 
    return { city: employeeJson.city, startDate: new Date(employeeJson.startDate), birthDay: new Date(employeeJson.birthDay), firstName: employeeJson.firstName, lastName: employeeJson.lastName, postalCode: employeeJson.postalCode.toString(), address: employeeJson.address
    }
  }

  setDownload(data: any) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector("#download");
      el!.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el!.setAttribute("download", 'xlsxtojson.json');
    }, 1000)
  }

}
