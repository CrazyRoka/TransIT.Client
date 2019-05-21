import { Component } from '@angular/core';
import { IssueService } from '../../../shared/services/issue.service';
import { Router } from '@angular/router';
import { priorityColors } from '../../../shared/declarations';
import { GlobalIssueComponent } from 'src/app/modules/shared/components/global-issue/global-issue.component';
import { HubConnection, HubConnectionBuilder, HttpTransportType } from "@aspnet/signalr";
import { TokenStore } from 'src/app/modules/core/helpers/token-store';

declare const $;

@Component({
  selector: 'app-issues',
  templateUrl: '../../../shared/components/global-issue/global-issue.component.html',
  styleUrls: ['../../../shared/components/global-issue/global-issue.component.scss']
})
export class IssuesComponent extends GlobalIssueComponent {
  constructor(
    issueService: IssueService,
    private router: Router,
    private tokenStore: TokenStore
    ) {
    super(issueService);
    this.tableConfig.columns = [
      ...this.tableConfig.columns,
      {
        title: 'Дія',
        data: null,
        defaultContent: `
        <button class="btn"><i class="fas fa-info-circle"></i></button>
        `
      }
    ];
  }

  ngOnInit() {
    this.startConnection();
    this.initTable();
    $('#issue-table tbody').on('click', 'button', this.selectItem(this));
  }

  private hubConnection: HubConnection

  private startConnection(): void {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5000/hubissue', {
        accessTokenFactory: () => this.tokenStore.getToken().accessToken,
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .build();
 
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))

      this.hubConnection.on('ReceiveIssues', () => { console.log('I have refreshed table'); this.redrawTable(); });
  }

  protected createRow(row: any, data: any, dataIndex: any) {
    $(row).css('background-color', priorityColors[data.priority]);
  }

  protected selectItem(component: any) {
    return function() {
      component.issueService.selectedItem = component.table.row($(this).parents('tr')).data();
      component.router.navigate(['/engineer/issues/edit']);
    };
  }
}
