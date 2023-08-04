import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../shared/api.service';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { Employees } from '../shared/model';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalContentComponent implements OnInit {
  @Input() public user: any; 
  @Input() public toBeDeleted: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  dataSource = new MatTableDataSource<Employees>();
  
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService, 
    private toastr: ToastrService,  
  ) { }

  ngOnInit() {
    console.log(this.user);
    this.toBeDeleted.subscribe((res: any) => this.toBeDeleted = res)
  }

showSuccess(action: string) {
  console.log('Succes')
  this.toastr.success('Succes, Employee is ' + action);
}

showError() {
  console.log('Error')
  this.toastr.error('Something went wrong!', 'Sorry');
}


delete() {
      this.apiService.deleteEmployee(206)  
     .pipe(
      catchError(error => {
        const statusCode = error.status;
        this.showError()
        return throwError(statusCode);
      })
      ).subscribe(() => {
        // this.dataSource.data = this.dataSource.data.filter(
        //   (u: Employees) => u.id !== id,
        //   )
          console.log('no error, 200')
          this.showSuccess('deleted');
          this.getEmployees()
    })
  }

  getEmployees() {
    this.apiService.getEmployees().subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }
  
}