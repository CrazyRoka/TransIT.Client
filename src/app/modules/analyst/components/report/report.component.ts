import { Component, OnInit } from '@angular/core';
import { MalfunctionGroup } from 'src/app/modules/shared/models/malfunction-group';
import { MalfunctionGroupService } from 'src/app/modules/shared/services/malfunction-group.service';
import { MalfunctionSubgroup } from 'src/app/modules/shared/models/malfunction-subgroup';
import { MalfunctionSubgroupService } from 'src/app/modules/shared/services/malfunction-subgroup.service';
import { VehicleTypeService } from 'src/app/modules/shared/services/vehicle-type.service';
import { VehicleType } from 'src/app/modules/shared/models/vehicleType';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  malfuncGroups: Array<MalfunctionGroup>;
  malfuncSubgroups: MalfunctionSubgroup[] = [];

  selectedMalfunctionGroup: MalfunctionGroup;

  tableGroup: any;

  constructor(
    private malfuncGroupService: MalfunctionGroupService,
    private malfuncSubGroupService: MalfunctionSubgroupService,
    private vechicleTypeService: VehicleTypeService
  ) {}
  tdOption: any = {
    responsive: true,
    select: {},
    columns: [],
    paging: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    }
  };
  ngOnInit() {
    this.malfuncSubGroupService.getEntities().subscribe(malfuncSubgroups => {
      this.malfuncSubgroups = malfuncSubgroups;
    });

    this.tdOption.columns = [
      {
        title: 'Група',
        className: 'details-control',
        data: 'name',
        defaultContent: ''
      }
    ];
    this.vechicleTypeService.getEntities().subscribe(VehicleType => {
      console.log('asc');

      VehicleType.forEach(a => {
        this.tdOption.columns.push({
          title: a.name,
          data: null,
          defaultContent: '0'
        });
      });
      this.tableGroup.destroy();
      $('#example').empty();
      this.tableGroup = $('#example').DataTable(this.tdOption);
      $('#example tbody').on('dblclick', 'td', this.showRow(this));
    });

    this.tableGroup = $('#example').DataTable(this.tdOption);

    this.tableGroup.on('select', (e, dt, type, index) => {
      const item = this.tableGroup.rows(index).data()[0];
      this.selectedMalfunctionGroup = item;
    });

    this.malfuncGroupService.getEntities().subscribe(malfuncGroups => {
      this.malfuncGroups = malfuncGroups;
      this.tableGroup.rows.add(this.malfuncGroups);
      this.tableGroup.draw();
    });
  }

  format(group) {
    let b = '';
    for (let i = 0; i < group.length; i++) {
      b +=
        `<tr>
        <td>` +
        group[i].name +
        `</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
      </tr>`;
    }
    return (
      `<table  class="table table-bordered table-hover" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">
          <thead>
              <tr>
                <th>Підгрупа</th>
                <th>Автобус</th>
                <th>Трамвай</th>
                <th>Тролейбус</th>
                <th>Електробус</th>
              </tr>
          </thead>
    <tbody>` +
      b +
      `</tbody> </table>`
    );
  }

  private showRow(component: any) {
    return function() {
      const tr = $(this).closest('tr');
      const row = component.tableGroup.row(tr);
      if (row.child.isShown()) {
        row.child.hide();
        tr.removeClass('shown');
      } else {
        row.child(component.format(component.filterMalfunctionSubGroup)).show();
        tr.addClass('shown');
      }
    };
  }

  get filterMalfunctionSubGroup(): Array<MalfunctionSubgroup> {
    return this.malfuncSubgroups.filter(x => {
      return x.malfunctionGroup !== null && x.malfunctionGroup.id === this.selectedMalfunctionGroup.id;
    });
  }
}
