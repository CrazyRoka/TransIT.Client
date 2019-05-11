import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

declare const $;

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  issues: Array<Issue>;
  private table: any;

  constructor(private issueService: IssueService, private router: Router) {}

  ngOnInit() {
    this.initTable();
  }

  protected initTable(): void {
    this.table = $('#issue-table').DataTable({
      scrollX: true,
      select: {
        style: 'single'
      },
      columns: [
        { title: 'Статус', data: 'state.transName', defaultContent: '' },
        { title: 'Поломка', data: 'malfunction.name', defaultContent: '' },
        { title: 'Гарантія', data: 'warranty', defaultContent: '' },
        { title: 'Транспорт', data: 'vehicle.inventoryId', defaultContent: '' },
        { title: 'Відповідальний', data: 'assignedTo.login', defaultContent: '' },
        { title: 'Виконати до', data: 'deadline', defaultContent: '' },
        { title: 'Опис', data: 'summary', defaultContent: '' },
        { title: 'Створено', data: 'createDate', defaultContent: '' },
        { title: 'Редаговано', data: 'modDate', defaultContent: '' },
        { data: 'id', bVisible: false },
      ],
      processing: true,
      serverSide: true,
      ajax: {
        url: environment.apiUrl + '/datatable/issue',
        type: 'POST'
      },
      paging: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    });
    this.table.on('select', this.selectRow);
  }

  protected selectRow(e: any, dt: any, type: any, indexes: any): void {
    const item = this.table.rows(indexes).data()[0];
    this.router.navigate(['/engineer/issues/edit', new Issue(item)]);
  }
}
