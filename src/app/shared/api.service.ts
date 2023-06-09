import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employees } from './model';
import { DataResult, orderBy, process, SortDescriptor } from '@progress/kendo-data-query';
import { Observable, of, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient) { }

  baseUrl = 'http://localhost:8080/';

  getEmployees() {
    return this.http.get<Employees>(this.baseUrl + 'employees/all')
    .pipe(map((item: any) => {
      console.log(item)
      return item
    }))
  }

  getBirthdays() {
    return this.http.get<Employees>(this.baseUrl + 'employees/birthdays')
    .pipe(map((item: any) => {
      console.log(item)
      return item
    }))
  }

  getJubilees() {
    return this.http.get<Employees>(this.baseUrl + 'employees/jubilees')
    .pipe(map((item: any) => {
      console.log(item)
      return item
    }))
  }
  

  // updateEmployee(id: number, employee: Employees): Observable<Employees> {
  //   return this.http.put<Employees>(`${this.baseUrl + 'employees/employees'}/${id}`, employee);
  // }

  updateEmployee(employee: Employees): Observable<Employees> {
    return this.http.put<Employees>(`${this.baseUrl + 'employees/employees'}/${employee.id}`, employee);
  }

  addEmployee(employee: Employees): Observable<Employees> {
    return this.http.post<Employees>(`${this.baseUrl + 'employees/addEmployee'}`, employee);
  }
  

  deleteEmployee(id: number) {
    return this.http.delete<Employees>(`${this.baseUrl + 'employees/deleteEmployee'}/${id}`);
  }
}
