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

  baseUrl = 'http://localhost:8080/api/v1/employees';

  getEmployees() {
    return this.http.get<Employees>(this.baseUrl)
    .pipe(map((item: any) => {
      console.log(item)
      return item
    }))
  }

  getEmployee(id: number) {
    return this.http.get<Employees>(this.baseUrl + '/' + id)
    .pipe(map((item: any) => {
      console.log(item)
      return item
    }))
  }

  getBirthdays(week: string) {
    return this.http.get<Employees>(this.baseUrl + '/birthdays?week=' + week)
    .pipe(map((item: any) => {
      console.log(item)
      return item
    }))
  }

  getJubilees(month: string) {
    return this.http.get<Employees>(this.baseUrl + '/jubilees?month=' + month)
    .pipe(map((item: any) => {
      console.log(item)
      return item
    }))
  }

  updateEmployee(employee: Employees): Observable<Employees> {
    return this.http.put<Employees>(`${this.baseUrl + 'employees/employees/excel'}/${employee.id}`, employee);
  }

  addEmployee(employee: Employees): Observable<Employees> {
    return this.http.post<Employees>(`${this.baseUrl }`, employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete<Employees>(`${this.baseUrl}/${id}`);
  }
}
