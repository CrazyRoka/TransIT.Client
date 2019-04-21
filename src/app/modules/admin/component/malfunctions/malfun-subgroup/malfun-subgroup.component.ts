import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MalfunSubgroup } from '../../../models/malfun-subgroup/malfun-subgroup';
import { MalfuncGroup } from '../../../models/malfunc-group/malfunc-group';
import { MalfunSubgroupService } from '../../../services/malfun-subgroup.service';
import { MalfuncGroupService } from '../../../services/malfunc-group.service';

@Component({
  selector: 'app-malfun-subgroup',
  templateUrl: './malfun-subgroup.component.html',
  styleUrls: ['./malfun-subgroup.component.scss']
})
export class MalfunSubgroupComponent implements OnInit {
  malfunSubgroups: MalfunSubgroup[] = [];
  malfuncGroupList: MalfuncGroup[] = [];
  datatable: any;
  malfunSubGroup: MalfunSubgroup = {
    name: '',
    malfunctionGroup: undefined
  };

  constructor(private serviceMalfuncSubGroup:MalfunSubgroupService, private serviceMalfuncGroup: MalfuncGroupService,
    private chRef: ChangeDetectorRef ) { }

  ngOnInit() {    
    this.serviceMalfuncGroup.getEntities().subscribe(group => (this.malfuncGroupList = group));
    this.serviceMalfuncSubGroup.getEntities().subscribe(subGroups => {
      this.malfunSubgroups = subGroups;
      this.chRef.detectChanges();
      const table: any = $('#subgroup');
      this.datatable = table.DataTable({
        language: {
          url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
        },
        scrollX: true
      });
    });
  }
  createItem() {}

  deleteItem(id: number) {}

}
