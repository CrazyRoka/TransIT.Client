import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssuesComponent } from './components/issues/issues.component';
import {IssueService} from './services/issue.service';
import {CoreModule} from '../core/core.module';
import {FormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {HttpClientModule} from '@angular/common/http';
import {EngineerRoutingModule} from './engineer-routing.module';
import { EngineerComponent } from './components/engineer/engineer.component';
import {StateService} from './services/state.service';
import { IssuelogComponent } from './components/issuelog/issuelog.component';
import {IssuelogService} from './services/issuelog.service';
import {ActionTypeService} from './services/action-type.service';

@NgModule({
  declarations: [
    EngineerComponent,
    IssuesComponent,
    IssuelogComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    EngineerRoutingModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule
  ],
  providers: [
    IssueService,
    IssuelogService,
    StateService,
    ActionTypeService
  ]
})
export class EngineerModule { }
