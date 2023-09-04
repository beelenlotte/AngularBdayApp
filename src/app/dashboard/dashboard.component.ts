import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeColumns, EmployeeColumnsBday, EmployeeColumnsJubel, Employees, ExcelEmployee } from '../shared/model';


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

  bdayDate = new Date()

  bdayCount = 1
  disableprevbday = false
  disablenextbday = false
  firstDayBday = this.getFirstDayOfWeek(this.bdayDate);
  lastDayBday = new Date(this.firstDayBday)
  lastDayOfWeek = this.lastDayBday.setDate(this.lastDayBday.getDate() + 6);

  jubelDate = new Date()
  jubelCount = 1
  disableprevjubel = false
  disablenextjubel = false
  firstDayJubel = new Date(this.jubelDate.getFullYear(), this.jubelDate.getMonth(), 1);
  lastDayJubel = new Date(this.jubelDate.getFullYear(), this.jubelDate.getMonth() + 1, 0);
  
  ngOnInit(): void {
    this.getEmployeesBday('current')
    this.getEmployeesJubel('current')
  }

  getFirstDayOfWeek(d: string | number | Date) {
    const date = new Date(d);
    const day = date.getDay(); 
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  getEmployeesBday(date: string) {
    this.apiService.getBirthdays(date).subscribe((res: any) => {
      this.dataSourceBday.data = res;  
      console.log('bdays', res) 
    });
  }
  
  getEmployeesJubel(date: string) {
    this.apiService.getJubilees(date).subscribe((res: any) => {
      this.dataSourceJubel.data = res;
      console.log('jubilees', res)
    });
  }

   addOneWeek(date = new Date()) {
    date.setDate(date.getDate() + 7);
    return date;
  }

  minusOneWeek(date = new Date()) {
    date.setDate(date.getDate() - 7);
    return date;
  }

  addOneMonth(date  = new Date()) {
    date.setDate(date.getDate() + 30)
    return date
  }

  minusOneMonth(date  = new Date()) {
    date.setDate(date.getDate() - 30)
    return date
  }

  prev() {
    this.bdayCount= this.bdayCount - 1 
    this.decideDisplayedBdays()
  }

  prevJubel() {
    this.jubelCount = this.jubelCount - 1
    this.decideDisplayedJubels()
  }

  next() {
    this.bdayCount= this.bdayCount + 1 
    this.decideDisplayedBdays()
  }

  nextJubel() {
    this.jubelCount = this.jubelCount + 1
    this.decideDisplayedJubels()
  }

  decideDisplayedBdays() {
    if (this.bdayCount === 0) {
      this.disableprevbday = true
      this.disablenextbday = false
      this.getEmployeesBday('last')
      this.bdayDate = this.minusOneWeek()
      
    }
    if (this.bdayCount === 1) {
      this.disableprevbday = false
      this.disablenextbday = false
      this.getEmployeesBday('current')
      this.bdayDate = new Date()
    }
    if (this.bdayCount === 2) {
      this.disableprevbday = false
      this.disablenextbday = true
      this.getEmployeesBday('next')
      this.bdayDate = this.addOneWeek()
    }
    this.firstDayBday = this.getFirstDayOfWeek(this.bdayDate)
    this.lastDayBday = new Date(this.firstDayBday)
    this.lastDayOfWeek = this.lastDayBday.setDate(this.lastDayBday.getDate() + 6);
  }

  decideDisplayedJubels() {
    if (this.jubelCount === 0) {
      this.disableprevjubel = true
      this.disablenextjubel = false
      this.getEmployeesJubel('last')
      this.jubelDate = this.minusOneMonth()
    }
    if (this.jubelCount === 1) {
      this.disableprevjubel = false
      this.disablenextjubel = false
      this.getEmployeesJubel('current')
      this.jubelDate = new Date()
    }
    if (this.jubelCount === 2) {
      this.disableprevjubel = false
      this.disablenextjubel = true
      this.getEmployeesJubel('next')
      this.jubelDate = this.addOneMonth()
    }
    // this.jubelDate = new Date()
    this.firstDayJubel = new Date(this.jubelDate.getFullYear(), this.jubelDate.getMonth(), 1);
    this.lastDayJubel = new Date(this.jubelDate.getFullYear(), this.jubelDate.getMonth()+ 1, 0);
  }

  
}
