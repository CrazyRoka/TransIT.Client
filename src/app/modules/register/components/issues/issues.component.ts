import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue';
import { Vehicle } from '../../models/vehicle';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  issues: Issue[];
  selectedIssue: Issue;

  private readonly tableConfig: DataTables.Settings = {
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    },
    columns: [
      {
        title: 'Транспорт'
      },
      {
        title: 'Стан заявки'
      },
      {
        title: 'Несправність'
      },
      {
        title: 'Опис'
      },
      {
        title: '',
        orderable: false
      }
    ]
  };

  constructor(private issueService: IssueService) {}

  ngOnInit() {
    $('#issues').DataTable(this.tableConfig);

    this.issueService.getEntities().subscribe(data => {
      this.addTableData(data);
    });
  }

  private addTableData(issues: Issue[]) {
    this.issues = issues;
    const view = issues.map(i => [
      this.vehicleName(i.vehicle),
      i.state.name,
      i.malfunction.name,
      i.summary,
      `<button id="details-issue-${i.id}" class="btn" data-toggle="modal" data-target="#editModal"><i class="fas fa-edit"></i></button>`
    ]);

    $('#issues')
      .dataTable()
      .api()
      .rows.add(view)
      .draw();
  }

  private vehicleName(vehicle: Vehicle): string {
    return `${vehicle.brand} ${vehicle.model} ${vehicle.vincode || ''} ${vehicle.inventoryId || ''} ${vehicle.regNum || ''}`;
  }
}
