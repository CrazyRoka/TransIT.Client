import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VehicleType } from '../../models/vehicleType';
import { VehicleTypeService } from 'src/app/modules/admin/services/vehicle-type.service';
import { State } from '../../models/state';
import { StateService } from 'src/app/modules/admin/services/state.service';
import { MalfuncGroup } from 'src/app/modules/admin/models/malfuncGroup/malfunc-group';
import { MalfuncGroupService } from 'src/app/modules/admin/services/malfunc-group.service';
import { MalfunSubgroup } from 'src/app/modules/admin/models/malfun-subgroup/malfun-subgroup';
import { MalfunSubgroupService } from 'src/app/modules/admin/services/malfun-subgroup.service';
import { Malfunction } from 'src/app/modules/admin/models/malfunc/malfunc';
import { MalfuncService } from 'src/app/modules/admin/services/malfunc.service';

@Component({
  selector: 'app-filters-tabs',
  templateUrl: './filters-tabs.component.html',
  styleUrls: ['./filters-tabs.component.scss']
})
export class FiltersTabsComponent implements OnInit {
  vehicleTypeList: VehicleType[] = [];
  stateList: State[] = [];
  malfunctionGroupList: MalfuncGroup[] = [];
  malfunctionSubGroupList: MalfunSubgroup[] = [];
  malfunctionList: Malfunction[] = [];
  @Output() StartDateValue = new EventEmitter<string>();
  @Output() EndDateValue = new EventEmitter<string>();
  @Output() VechicleTypeValue = new EventEmitter<string>();
  @Output() StateValue = new EventEmitter<string>();
  @Output() Filter = new EventEmitter();

  selectedType: string;
  selectedState: string;

  constructor(
    private vehicleTypeService: VehicleTypeService,
    private stateService: StateService,
    private malfunctionGropService: MalfuncGroupService,
    private malfunctionSubGropService: MalfunSubgroupService,
    private malfunctionService: MalfuncService
  ) {}

  ngOnInit() {
    this.vehicleTypeService.getEntities().subscribe(data => (this.vehicleTypeList = data));
    this.stateService.getEntities().subscribe(data => (this.stateList = data));
    this.malfunctionGropService.getEntities().subscribe(items => (this.malfunctionGroupList = items));
    this.malfunctionSubGropService.getEntities().subscribe(data => (this.malfunctionSubGroupList = data));
    this.malfunctionService.getEntities().subscribe(data => (this.malfunctionList = data));
    (<any>$('#startDate')).datepicker({
      uiLibrary: 'bootstrap4',
      iconsLibrary: 'fontawesome',
      maxDate: function() {
        return $('#endDate').val();
      }
    });
    (<any>$('#endDate')).datepicker({
      uiLibrary: 'bootstrap4',
      iconsLibrary: 'fontawesome',
      minDate: function() {
        return $('#startDate').val();
      }
    });
  }
  selectVechicleType(type) {
    this.selectedType = type;
  }
  selectState(state) {
    this.selectedState = state;
  }
  selectFilter() {
    this.EndDateValue.next(
      $('#endDate')
        .val()
        .toString()
    );
    this.StartDateValue.next(
      $('#startDate')
        .val()
        .toString()
    );
    this.VechicleTypeValue.next(this.selectedType);
    this.StateValue.next(this.selectedState);
    this.Filter.next();
  }
}
