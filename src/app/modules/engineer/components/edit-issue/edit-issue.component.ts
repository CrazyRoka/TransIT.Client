import { Component, OnInit } from '@angular/core';
import { Issue } from '../../models/issue';
import { IssueService } from 'src/app/modules/shared/services/issue.service';

@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.scss']
})
export class EditIssueComponent implements OnInit {
  issue: Issue;

  constructor(private issueService: IssueService) {}

  ngOnInit() {
    this.issue = this.issueService.selectedIssue;
  }
}
