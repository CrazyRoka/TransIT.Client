import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IssuesComponent} from './components/issues/issues.component';
import {EngineerComponent} from './components/engineer/engineer.component';
import {IssuelogComponent} from './components/issuelog/issuelog.component';

const routes: Routes = [
  {
    path: '',
    component: EngineerComponent,
    children: [
      { path: 'issues', component: IssuesComponent },
      { path: 'issue-logs', component: IssuelogComponent },
      { path: '**', redirectTo: 'issues' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngineerRoutingModule {}
