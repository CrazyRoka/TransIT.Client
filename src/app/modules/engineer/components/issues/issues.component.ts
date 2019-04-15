import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IssueService} from '../../services/issue.service';
import {Issue} from '../../../core/models/issue';

declare const $;

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  private issues: Array<Issue>;

  public issue: Issue;

  constructor(
    private service: IssueService,
    private chRef: ChangeDetectorRef
  ) {
    this.issue = new Issue();
  }

  ngOnInit() {
    $('#table').DataTable({
      // processing: true,
      // serverSide: true,
      columns: [
        { name: 'state', title: 'Стан' },
        { name: 'malfunction', title: 'Поломка' },
        { name: 'warranty', title: 'Гарантія' },
        { name: 'vehicle', title: 'Транспорт' },
        { name: 'state', title: 'Стан' },
        { name: 'assignedTo', title: 'Відповідальний' },
        { name: 'summary', title: 'Опис' },
        { name: 'createDate', title: 'Створено' },
        { name: 'modDate', title: 'Редаговано' },
      ],
      // ajax: {
      //   url: 'https://localhost:5001/api/values/filter',
      //   type: 'POST',
      //   datatype: 'application/json'
      // }
    });
    this.service.getEntities().subscribe(issues => {
      this.issues = issues;
      this.chRef.detectChanges();
    });
  }


  public createItem(): void {
    this.service.addEntity(this.issue).subscribe();
  }

  public editItem(): void {
    this.service.updateEntity(this.issue).subscribe();
  }

  public deleteItem(id: number): void {
    this.service.deleteEntity(id);
  }
}
