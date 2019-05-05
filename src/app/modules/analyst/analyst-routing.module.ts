import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalystComponent } from './components/analyst/analyst.component';

const routes: Routes = [
  { path: '', component: AnalystComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalystRoutingModule { }
