import { Component, OnInit } from '@angular/core';
import { MalfunctionGroup } from 'src/app/modules/shared/models/malfunction-group';
import { MalfunctionGroupService } from 'src/app/modules/shared/services/malfunction-group.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  malfuncGroups: Array<MalfunctionGroup>;
  tableGroup: any;
  selectedMalfunctionGroup: MalfunctionGroup;

  ngOnInit() {
    function format(d) {
      return (
        '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>Full name:</td>' +
        '<td>' +
        'd.name' +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Extension number:</td>' +
        '<td>' +
        'd.name' +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Extra info:</td>' +
        '<td>And any further details here (images etc)...</td>' +
        '</tr>' +
        '</table>'
      );
    }

    this.tableGroup = $('#example').DataTable({
      responsive: true,
      columns: [
        {
          title: '',
          className: 'details-control',
          orderable: false,
          data: 'name',
          defaultContent: ''
        },
        {
          title: 'Автобус',
          data: null,
          defaultContent: '0'
        },
        {
          title: 'Трамвай',
          data: null,
          defaultContent: '1'
        },
        {
          title: 'Тролейбус',
          data: null,
          defaultContent: '2'
        },
        {
          title: 'Електробус',
          data: null,
          defaultContent: '3'
        }
      ],
      paging: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    });

    this.tableGroup.on('select', (e, dt, type, index) => {
      const item = this.tableGroup.rows(index).data()[0];
      this.selectedMalfunctionGroup = item;
    });

    this.malfuncGroupService.getEntities().subscribe(malfuncGroups => {
      this.malfuncGroups = malfuncGroups;
      this.tableGroup.rows.add(this.malfuncGroups);
      this.tableGroup.draw();
    });

    $('#example tbody').on('click', 'td.details-control', this.showRow(this));
    // function() {
    //   var tr = $(this);
    //   var row = this.tableGroup.row(tr);
    //   if (row.child.isShown()) {
    //     row.child.hide();
    //     tr.removeClass('shown');
    //   } else {
    //     row.child(format(row.data())).show();
    //     console.dir(row);
    //     console.dir();
    //     tr.addClass('shown');
    //   }
    // });
  }

  format(d) {
    return (
      '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
      '<tr>' +
      '<td>Full name:</td>' +
      '<td>' +
      'd.name' +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td>Extension number:</td>' +
      '<td>' +
      'd.name' +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td>Extra info:</td>' +
      '<td>And any further details here (images etc)...</td>' +
      '</tr>' +
      '</table>'
    );
  }

  private showRow(component: any) {
    return function() {
      var tr = $(this).closest('tr');
      var row = component.tableGroup.row(tr);
      if (row.child.isShown()) {
        row.child.hide();
        tr.removeClass('shown');
      } else {
        row.child(component.format(row.data())).show();
        tr.addClass('shown');
      }
    };
  }

  constructor(private malfuncGroupService: MalfunctionGroupService) {}
}
