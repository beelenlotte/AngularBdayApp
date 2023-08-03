import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditorComponent } from './editor/editor.component';
import { AccountComponent } from './account/account.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GridModule } from '@progress/kendo-angular-grid';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
// import { MaterialModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ModalContentComponent } from './modal-content/modal-content.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EditorComponent,
    AccountComponent,
    ModalContentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    HttpClientModule,
    GridModule,
    ScrollingModule,
    CdkVirtualScrollViewport,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatNativeDateModule,
    FormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: DashboardComponent},
      {path: 'account', component: AccountComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'editor', component: EditorComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
