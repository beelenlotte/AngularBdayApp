import { Component, OnInit, DefaultIterableDiffer } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeColumns, Employees } from '../shared/model';
import { ApiService } from '../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
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
    this.apiService.getEmployees().subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  // editRow(row: Employees) {
  //   if (row.id === 0) {
  //     console.log('rowid is gelijk aan 0', row.id, row)
  //     this.apiService.addEmployee(row).subscribe((newEmployee: Employees) => {
  //       row.id = newEmployee.id
  //       console.log(row)
  //       row.isEdit = false
  //      })
  //   } else {
  //     console.log('ELSE rowid is NIEt gelijk aan 0')
  //         this.apiService.updateEmployee(row).subscribe(() => (row.isEdit = false))
  //         console.log('row', row)
  //       }
  // }
  
  editRow(row: Employees) {
    if (row.id === 0) {
      this.apiService.addEmployee(row).pipe(
      catchError(error => {
        if(error.status === 200){
          this.showSuccess('added')
        }
        else {
          this.showError()
        }
        return throwError(error);
      })
      )
      .subscribe(response => {
        console.log('RESPONSE ERROR',response)
      }); 
    } else {
        console.log('ELSE rowid is NIEt gelijk aan 0')
        this.apiService.updateEmployee(row).pipe(
          catchError(error => {
            if(error.status === 200){
              this.showSuccess('edited')
            }
            else {
              this.showError()
            }
            return throwError(error);
          })
          
          ).subscribe(() => (row.isEdit = false))
        console.log('row', row)
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
        return throwError(error);
      })
      
      ).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: Employees) => u.id !== id,
      )
    })
    console.log('to be deleted id:', id)
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

  selectAll(event: any) {
    this.dataSource.data = this.dataSource.data.map((item) => ({
      ...item,
      isSelected: event.checked,
    }))
  }

  showSuccess(action: string) {
    console.log('Succes')
  this.toastr.success('Succes, Employee is ' + action);
  }

  showError() {
    console.log('Error')
    this.toastr.error('Something went wrong!', 'Sorry');
  }
}
