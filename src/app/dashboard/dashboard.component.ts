import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeColumns, EmployeeColumnsBday, EmployeeColumnsJubel, Employees } from '../shared/model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {  

  constructor(public apiService: ApiService) {
  }

  displayedColumnsBday: string[] = EmployeeColumnsBday.map((col) => col.key);
  columnsSchemaBday: any = EmployeeColumnsBday;
  dataSourceBday = new MatTableDataSource<Employees>();

  displayedColumnsJubel: string[] = EmployeeColumnsJubel.map((col) => col.key);
  columnsSchemaJubel: any = EmployeeColumnsJubel;
  dataSourceJubel = new MatTableDataSource<Employees>();

  
  getAge() {
   
  }

  getJubilee() {
   
  }

  getEmployeesBday() {
    this.apiService.getBirthdays().subscribe((res: any) => {
      this.dataSourceBday.data = res;
      console.log('Bday', this.dataSourceBday)
    });
  }
  
  getEmployeesJubel() {
    this.apiService.getJubilees().subscribe((res: any) => {
      this.dataSourceJubel.data = res;
      console.log('Jubel', this.dataSourceBday.data)
    });
  }
  ngOnInit(): void {
    this.getEmployeesBday()
    this.getEmployeesJubel()
  }

}
