import { Component, OnInit } from '@angular/core';
import { Malfunction } from 'src/app/modules/shared/models/malfunction';
import { MalfunctionService } from 'src/app/modules/shared/services/malfunction.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  private tableMalfunction: DataTables.Api;
  malfunction: Malfunction;
  malfunctions: Array<Malfunction>;

  ngOnInit() {
    this.tableMalfunction = $('#reportTable').DataTable({
      responsive: true,
      columns: [
        {
          className: 'details-control',
          orderable: false,
          data: null,
          defaultContent: ''
        },
        { title: 'Помилки', data: 'name', defaultContent: '' }
      ],

      paging: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    });

    this.malfuncService.getEntities().subscribe(malfunctions => {
      this.malfunctions = malfunctions;
      this.tableMalfunction.rows.add(this.malfunctions);
      this.tableMalfunction.draw();
    });

    function format(d) {
      return (
        '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>Full name:</td>' +
        '<td>' +
        d.description +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Extension number:</td>' +
        '<td>' +
        d.title +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Extra info:</td>' +
        '<td>And any further details here (images etc)...</td>' +
        '</tr>' +
        '</table>'
      );
    }

    $(document).ready(function() {
      var table = $('#example').DataTable({
        ajax: {
          url: 'https://ghibliapi.herokuapp.com/films',
          dataSrc: ''
        },
        columns: [
          {
            className: 'details-control',
            orderable: false,
            data: null,
            defaultContent: ''
          },
          { data: 'title' },
          { data: 'producer' },
          { data: 'title' },
          { data: 'producer' }
        ],
        order: [[1, 'asc']]
      });

      // Add event listener for opening and closing details
      $('#example tbody').on('click', 'td.details-control', function() {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
          // This row is already open - close it
          row.child.hide();
          tr.removeClass('shown');
        } else {
          // Open this row
          row.child(format(row.data())).show();
          tr.addClass('shown');
        }
      });
    });
  }

  constructor(private malfuncService: MalfunctionService) {}
}
