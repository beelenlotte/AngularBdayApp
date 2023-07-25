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

  bdayDate = 'current'
  bdayCount = 1
  disableprevbday = false
  disablenextbday = false

  jubekDate = 'current'
  jubelCount = 1
  disableprevjubel = false
  disablenextjubel = false
  
  today = new Date()

  

  getFirstDayOfWeek(d: string | number | Date) {
    const date = new Date(d);
    const day = date.getDay(); 
  
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  
    return new Date(date.setDate(diff));
    
  }
  firstDay = this.getFirstDayOfWeek(this.today);
  lastDay = new Date(this.firstDay)
  lastDayOfWeek = this.lastDay.setDate(this.lastDay.getDate() + 6);

  

  ngOnInit(): void {
    this.getEmployeesBday('current')
    this.getEmployeesJubel('current')
  }

  getEmployeesBday(date: string) {
    this.apiService.getBirthdays(date).subscribe((res: any) => {
      this.dataSourceBday.data = res;    });
  }
  
  getEmployeesJubel(date: string) {
    this.apiService.getJubilees(date).subscribe((res: any) => {
      this.dataSourceJubel.data = res;
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

  prev() {
    this.bdayCount= this.bdayCount-1 
    this.decideDisplayedBdays()
  }

  next() {
    this.bdayCount= this.bdayCount+1 
    this.decideDisplayedBdays()
  }

  decideDisplayedBdays() {
    var date = new Date()
    if (this.bdayCount === 0) {
      this.disableprevbday = true
      this.disablenextbday = false
      this.getEmployeesBday('last')
      this.today = this.minusOneWeek()
      
    }
    if (this.bdayCount === 1) {
      this.disableprevbday = false
      this.disablenextbday = false
      this.getEmployeesBday('current')
      this.today = new Date()
    }
    if (this.bdayCount === 2) {
      this.disableprevbday = false
      this.disablenextbday = true
      this.today = this.addOneWeek()
    }
    this.firstDay = this.getFirstDayOfWeek(this.today)
    this.lastDay = new Date(this.firstDay)
    this.lastDayOfWeek = this.lastDay.setDate(this.lastDay.getDate() + 6);
  }
  
}
