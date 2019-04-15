import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssuesComponent } from './components/issues/issues.component';
import {IssueService} from './services/issue.service';
import {CoreModule} from '../core/core.module';
import {FormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule, MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule, MatTabsModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {EngineerRoutingModule} from './engineer-routing.module';
import { EngineerComponent } from './components/engineer/engineer.component';

@NgModule({
  declarations: [IssuesComponent, EngineerComponent],
  imports: [
    CommonModule,
    CoreModule,
    EngineerRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule
  ],
  providers: [
    IssueService
  ]
})
export class EngineerModule { }
