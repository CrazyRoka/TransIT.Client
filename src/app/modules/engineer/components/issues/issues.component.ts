import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IssueService} from '../../services/issue.service';
import {Issue} from '../../../core/models/issue';
import {State} from '../../../core/models/state';
import {StateService} from "../../services/state.service";

declare const $;

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  public issue: Issue;
  public stateList: Array<State>;
  public issues: Array<Issue>;

  private table: any;

  constructor(
    private issueService: IssueService,
    private stateService: StateService,
    private chRef: ChangeDetectorRef
  ) {
    this.issue = new Issue();
  }

  ngOnInit() {
    this.stateService.getEntities().subscribe(states => {
      this.stateList = states;
    });
    this.issueService.getEntities().subscribe(issues => {
      this.issues = issues;
      this.chRef.detectChanges();
    });
    this.table = $('#table').DataTable({
      // processing: true,
      // serverSide: true,
      data: this.issues,
      // columns: [
      //   { name: 'state', title: 'Стан' },
      //   { name: 'malfunction', title: 'Поломка' },
      //   { name: 'warranty', title: 'Гарантія' },
      //   { name: 'vehicle', title: 'Транспорт' },
      //   { name: 'assignedTo', title: 'Відповідальний' },
      //   { name: 'summary', title: 'Опис' },
      //   { name: 'createDate', title: 'Створено' },
      //   { name: 'modDate', title: 'Редаговано' },
      // ],
      // ajax: {
      //   url: 'https://localhost:5001/api/values/filter',
      //   type: 'POST',
      //   datatype: 'application/json'
      // }
    });
  }

  public createItem(): void {
    this.issueService.addEntity(this.issue).subscribe();
  }

  public editItem(): void {
    this.issueService.updateEntity(this.issue).subscribe();
  }

  public deleteItem(id: number): void {
    this.issueService.deleteEntity(id);
  }
}
