import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeColumns, Employees } from '../shared/model';
import { ApiService } from '../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import {  catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit{
  displayedColumns: string[] = EmployeeColumns.map((col) => col.key);
  columnsSchema: any = EmployeeColumns;
  dataSource = new MatTableDataSource<Employees>();
  valid: any = {};
  
  constructor(public apiService: ApiService, private toastr: ToastrService) {}
  
  ngOnInit(): void {
    this.getEmployees()
  }

  getEmployees() {
    this.apiService.getEmployees().subscribe((res: any) => {
      this.dataSource.data = res;
      console.log('refresh employess')
    });
  }
  
  editRow(row: Employees) {
    // To addnew employee 
    if (row.id === 0) {
      this.apiService.addEmployee(row).pipe(
      catchError(error => {
        if(error.status === 200){
          this.showSuccess('added')
        }
        else {
          this.showError()
        }
        this.getEmployees()
        return throwError(error);
      })
      )
      .subscribe(response => {
      }); 
    } 
    // To edit an employee 
    else {
        this.apiService.updateEmployee(row).pipe(
          catchError(error => {
            if(error.status === 200){
              this.showSuccess('edited')
            }
            else {
              this.showError()
            }
            this.getEmployees()
            return throwError(error);
          })
          
          ).subscribe(() => (row.isEdit = false))
      }
    }

  addRow() {
    const newRow: Employees = {
      id: 0,
      isEdit: true,
      employeeId: '',
      firstName: '',
      lastName: '',
      address: '',
      postalcode: '',
      city: '',
      birthDay: '',
      startDate: '',
    }
    this.dataSource.data = [newRow, ...this.dataSource.data]
  }

  removeRow(id: number) {
    this.apiService.deleteEmployee(id).pipe(
      catchError(error => {
        if(error.status === 200){
          this.showSuccess('deleted')
        }
        else {
          this.showError()
        }
        this.getEmployees()
        return throwError(error);
      })
      ).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: Employees) => u.id !== id,
      )
    })
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

  // Toastr: pop-up dialog with short message
  // used to show a message after an action is taken: Add, Edit, Delete
  showSuccess(action: string) {
    console.log('Succes')
  this.toastr.success('Succes, Employee is ' + action);
  }

  showError() {
    console.log('Error')
    this.toastr.error('Something went wrong!', 'Sorry');
  }
}
