import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  employees:any
  columndefs : any[] = ['employeeId', 'firstName','lastName', 'startDate', 'birthDay'];
   
  constructor(public apiService: ApiService) {
  }

  public dataSource:any;

  ngOnInit(): void {
    this.apiService.getEmployees().subscribe(res => {this.employees = res})

    this.apiService.getEmployees()
      .subscribe(response => {
        this.dataSource = new MatTableDataSource(response);
      });
  }

}
