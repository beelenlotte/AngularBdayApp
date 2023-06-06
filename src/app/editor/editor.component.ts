import { Component, OnInit, DefaultIterableDiffer } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeColumns, Employees } from '../shared/model';
import { ApiService } from '../shared/api.service';

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
  
  constructor(public apiService: ApiService) {}
  
  
  ngOnInit(): void {
    this.apiService.getEmployees().subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }
 
  // editRow(id: number, row: Employees) {
  //   if (row.id === 0) {
  //     console.log('rowid is gelijk aan 0', id, row)
  //     this.apiService.updateEmployee(id, row).subscribe((newEmployee: Employees) => {
  //       console.log(row)
  //       id = row.id
  //       row.isEdit = false
  //      })
  //   } else {
  //     console.log('ELSE rowid is NIEt gelijk aan 0')
  //         this.apiService.updateEmployee( row.id, row).subscribe(() => (row.isEdit = false))
  //         console.log('row', row)
  //       }
  // }

  editRow(row: Employees) {
    if (row.id === 0) {
      console.log('rowid is gelijk aan 0', row.id, row)
      this.apiService.addEmployee(row).subscribe((newEmployee: Employees) => {
        row.id = newEmployee.id
        console.log(row)
        row.isEdit = false
       })
    } else {
      console.log('ELSE rowid is NIEt gelijk aan 0')
          this.apiService.updateEmployee(row).subscribe(() => (row.isEdit = false))
          console.log('row', row)
        }
  }

  
  addRow() {
    const newRow: Employees = {
      id: 0,
      // isSelected: false,
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
    this.apiService.deleteEmployee(id).subscribe(() => {
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

  // isAllSelected() {
  //   return this.dataSource.data.every((item) => item.isSelected)
  // }

  // isAnySelected() {
  //   return this.dataSource.data.some((item) => item.isSelected)
  // }

  selectAll(event: any) {
    this.dataSource.data = this.dataSource.data.map((item) => ({
      ...item,
      isSelected: event.checked,
    }))
  }
}
