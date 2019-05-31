import { Component, OnInit } from '@angular/core';
import { MalfunctionGroup } from 'src/app/modules/shared/models/malfunction-group';
import { MalfunctionGroupService } from 'src/app/modules/shared/services/malfunction-group.service';
import { MalfunctionSubgroup } from 'src/app/modules/shared/models/malfunction-subgroup';
import { MalfunctionSubgroupService } from 'src/app/modules/shared/services/malfunction-subgroup.service';
import { VehicleTypeService } from 'src/app/modules/shared/services/vehicle-type.service';
import { Malfunction } from 'src/app/modules/shared/models/malfunction';
import { MalfunctionService } from 'src/app/modules/shared/services/malfunction.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  malfunc: Malfunction[] = [];
  malfuncGroups: Array<MalfunctionGroup>;
  malfuncSubgroups: MalfunctionSubgroup[] = [];

  selectedMalfunction: Malfunction;
  selectedMalfunctionGroup: MalfunctionGroup;
  selectedMalfunctionSubGroup: MalfunctionSubgroup;

  tableGroup: any;
  tableSubGroup: any;
  tableSubSubGroup: any;

  constructor(
    private malfuncService: MalfunctionService,
    private malfuncGroupService: MalfunctionGroupService,
    private malfuncSubGroupService: MalfunctionSubgroupService,
    private vechicleTypeService: VehicleTypeService
  ) {}

  tdOption: any = {
    responsive: true,
    select: {},
    columns: [],
    scrollX: true,
    paging: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    }
  };

  ngOnInit() {
    this.malfuncSubGroupService.getEntities().subscribe(malfuncSubgroups => {
      this.malfuncSubgroups = malfuncSubgroups;
    });

    this.malfuncService.getEntities().subscribe(malfunc => {
      this.malfunc = malfunc;
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

      $('#example tbody').on('click', 'td', this.showRow(this.tdOption, this));
    });

    this.tableGroup = $('#example').DataTable(this.tdOption);

    this.malfuncGroupService.getEntities().subscribe(malfuncGroups => {
      this.malfuncGroups = malfuncGroups;
      this.tableGroup.rows.add(this.malfuncGroups);
      this.tableGroup.draw();
    });
  }

  format() {
    return `<div style="background-color: rgb(216, 202, 202)"><table id="example2"  class="table table-bordered table-hover" style="width:100%;">
        </table></div>`;
  }

  formatSub() {
    return `<table id="example3"  class="table table-bordered table-hover" style="width:100%; background-color: rgb(221, 195, 220)">
        </table>`;
  }

  private showRow(option: any, component: any) {
    return function() {
      console.log('1');
      const tr = $(this).closest('tr');
      const row = component.tableGroup.row(tr);
      component.selectedMalfunctionGroup = row.data();

      if (row.child.isShown()) {
        row.child.hide();
        tr.removeClass('shown');
      } else {
        row.child(component.format()).show();
        tr.addClass('shown');
      }

      component.tableSubGroup = $('#example2').DataTable(option);
      $('#example2 tbody').on('dblclick', 'td', component.showSubRow(component));

      component.tableSubGroup.rows.add(component.filterMalfunctionSubGroup);
      component.tableSubGroup.draw();

      component.tableSubGroup.on('select', (e, dt, type, index) => {
        const item = component.tableSubGroup.rows(index).data()[0];
        component.selectedMalfunctionSubGroup = item;
      });
    };
  }

  private showSubRow(component: any) {
    return function() {
      console.log('2');
      const tr = $(this).closest('tr');
      const row = component.tableSubGroup.row(tr);
      console.log(tr);
      if (row.child.isShown()) {
        row.child.hide();
        tr.removeClass('shownsub');
      } else {
        row.child(component.formatSub()).show();
        tr.addClass('shownsub');
      }

      component.tableSubSubGroup = $('#example3').DataTable(component.tdOption);
      component.tableSubSubGroup.rows.add(component.filterMalfunction);
      component.tableSubSubGroup.draw();
    };
  }

  get filterMalfunctionSubGroup(): Array<MalfunctionSubgroup> {
    return this.malfuncSubgroups.filter(x => {
      return x.malfunctionGroup !== null && x.malfunctionGroup.id === this.selectedMalfunctionGroup.id;
    });
  }

  get filterMalfunction(): Array<Malfunction> {
    return this.malfunc.filter(x => {
      return x.malfunctionSubgroup !== null && x.malfunctionSubgroup.name === this.selectedMalfunctionSubGroup.name;
    });
  }
}
