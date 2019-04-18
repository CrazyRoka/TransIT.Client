import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IssuelogService} from '../../services/issuelog.service';
import {IssueLog} from '../../../core/models/issuelog';
import {ActionType} from '../../../core/models/actionType';
import {State} from '../../../core/models/state';

declare const $;

@Component({
  selector: 'app-issuelog',
  templateUrl: './issuelog.component.html',
  styleUrls: ['./issuelog.component.scss']
})
export class IssuelogComponent implements OnInit {

  public issueLog: IssueLog;
  public issueLogs: Array<IssueLog>;
  public states: Array<State>;
  public actionTypes: Array<ActionType>;

  private issueLogForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private issueLogService: IssuelogService
  ) {
    this.issueLog = new IssueLog();
    this.issueLogForm = this.fb.group({

    });
  }

   ngOnInit() {
    $('#issuelog-table').DataTable({
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    });
  }

  public createItem(): void {
    this.issueLogService.addEntity(this.issueLog).subscribe();
  }

  public editItem(): void {
    this.issueLogService.updateEntity(this.issueLog).subscribe();
  }

  public deleteItem(id: number): void {
    this.issueLogService.deleteEntity(id);
  }
}
