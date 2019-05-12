import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './component/users/users.component';
import { VehiclesComponent } from './component/vehicles/vehicles.component';
import { MalfunctionsComponent } from './component/malfunctions/malfunctions.component';
import { MalfuncGroupComponent } from './component/malfunctions/malfunc-group/malfunc-group.component';
import { MalfunSubgroupComponent } from './component/malfunctions/malfun-subgroup/malfun-subgroup.component';
import { MalfuncComponent } from './component/malfunctions/malfunc/malfunc.component';
import { ActionComponent } from './component/action/action.component';
import { AdminComponent } from './component/admin/admin.component';
import { SupplierComponent } from './component/supplier/supplier.component';
import { DocumentsComponent } from './component/documents/documents.component';
import { IssueLogComponent } from './component/issue-log/issue-log.component';
import { DictionaryComponent } from './component/dictionary/dictionary.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'vehicles', component: VehiclesComponent },
      {
        path: 'malfunctions',
        component: MalfunctionsComponent,
        children: [
          { path: 'malfunc-group', component: MalfuncGroupComponent },
          { path: 'malfunc-subgroup', component: MalfunSubgroupComponent },
          { path: 'malfunc', component: MalfuncComponent }
        ]
      },
      { path: 'actions', component: ActionComponent },
      { path: 'supplier', component: SupplierComponent },
      { path: 'documents', component: DocumentsComponent },
      { path: 'issue-log', component: IssueLogComponent },
      { path: 'dictionary', component: DictionaryComponent },
      { path: '**', redirectTo: 'users' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
