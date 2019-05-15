import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VehicleType } from '../../models/vehicleType';
import { VehicleTypeService } from 'src/app/modules/admin/services/vehicle-type.service';
import { State } from '../../models/state';
import { StateService } from 'src/app/modules/admin/services/state.service';

@Component({
  selector: 'app-filters-tabs',
  templateUrl: './filters-tabs.component.html',
  styleUrls: ['./filters-tabs.component.scss']
})
export class FiltersTabsComponent implements OnInit {
  vehicleTypeList: VehicleType[] = [];
  stateList: State[] = [];
  @Output() StartDateValue = new EventEmitter<string>();
  @Output() EndDateValue = new EventEmitter<string>();
  @Output() VechicleTypeValue = new EventEmitter<string>();
  @Output() StateValue = new EventEmitter<string>();

  constructor(private vehicleTypeService: VehicleTypeService, private stateService: StateService) {}

  ngOnInit() {
    this.vehicleTypeService.getEntities().subscribe(data => (this.vehicleTypeList = data));
    this.stateService.getEntities().subscribe(data => (this.stateList = data));
    (<any>$('#startDate'))
      .datepicker({
        uiLibrary: 'bootstrap4',
        iconsLibrary: 'fontawesome',
        maxDate: function() {
          return $('#endDate').val();
        }
      })
      .on('change', () => {
        this.StartDateValue.next(
          $('#startDate')
            .val()
            .toString()
        );
      });
    (<any>$('#endDate'))
      .datepicker({
        uiLibrary: 'bootstrap4',
        iconsLibrary: 'fontawesome',
        minDate: function() {
          return $('#startDate').val();
        }
      })
      .on('change', () => {
        this.EndDateValue.next(
          $('#endDate')
            .val()
            .toString()
        );
      });
  }
  selectVechicleType(type) {
    this.VechicleTypeValue.next(type);
  }
  selectState(state) {
    this.StateValue.next(state);
  }
}
