import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MalfuncService } from '../../../services/malfunc.service';
import { Malfunction } from '../../../models/malfunc/malfunc';

declare const $;

@Component({
  selector: 'app-malfunc',
  templateUrl: './malfunc.component.html',
  styleUrls: ['./malfunc.component.scss']
})
export class MalfuncComponent implements OnInit {
  private table: DataTables.Api;

  selectedMalfunction: Malfunction;
  malfunctions: Array<Malfunction>;
  malfunction: Malfunction;

  constructor(private malfuncService: MalfuncService, private router: Router) {}

  ngOnInit() {
    this.table = $('#malfunc-table').DataTable({
      responsive: true,
      select: {
        style: 'single'
      },
      columns: [{ data: 'id', bVisible: false }, { title: 'Помилки', data: 'name', defaultContent: '' }],
      paging: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    });
    this.malfuncService.getEntities().subscribe(malfunctions => {
      this.malfunctions = malfunctions;
      this.table.rows.add(this.malfunctions);
      this.table.draw();
    });
    this.table.on('select', (e, dt, type, index) => {
      const item = this.table.rows(index).data()[0];
      this.selectedMalfunction=item;
    });
  }

  deleteMalfunction(malfunction: Malfunction) {
    this.malfunctions = this.malfunctions.filter(m => m !== malfunction);
    this.table
      .rows('.selected')
      .remove()
      .draw();
    // console.log(malfunctionGroup);
    console.log(this.malfunctions);
  }

  addMalfunction(malfunction: Malfunction) {
    this.malfunctions = [...this.malfunctions, malfunction];
    this.table.row.add(malfunction);
    console.log(this.malfunctions);
    this.table.draw();
  }
}
