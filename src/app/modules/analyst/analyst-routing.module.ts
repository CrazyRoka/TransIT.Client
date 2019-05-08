import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalystComponent } from './component/analyst/analyst.component';
import { IssueAnalystComponent } from './component/issue-analyst/issue-analyst.component';
import { IssueLogAnalystComponent } from './component/issue-log-analyst/issue-log-analyst.component';

const routes: Routes = [
  {
    path: '',
    component: AnalystComponent,
    children: [
      { path: 'issues', component: IssueAnalystComponent },
      { path: 'issue-logs', component: IssueLogAnalystComponent },
      { path: '**', redirectTo: 'issues' }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalystRoutingModule {}
