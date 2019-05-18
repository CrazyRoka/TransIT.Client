import { Component, OnInit } from '@angular/core';
import { Issue } from '../../models/issue';
import { Router } from '@angular/router';
import { GlobalIssueComponent } from 'src/app/modules/shared/components/global-issue/global-issue.component';
import { IssueService } from 'src/app/modules/shared/services/issue.service';
declare const $;

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent extends GlobalIssueComponent implements OnInit {
  protected table: any;

  constructor(protected issueService: IssueService, protected router: Router) {
    super(issueService, router);
  }

  ngOnInit() {
    this.initTable2();
  }

  protected initTable2(): void {
    this.table = $('#issue-table').DataTable(this.tableConfig);
    this.table.on('select', this.selectRow.bind(this));
  }

  protected selectRow(e: any, dt: any, type: any, indexes: any): void {
    this.issueService.selectedIssue = new Issue(this.table.rows(indexes).data()[0]);
    this.router.navigate(['/engineer/issues/edit']);
  }
}
