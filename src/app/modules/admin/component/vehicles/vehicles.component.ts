import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Vehicle } from '../../models/vehicle/vehicle';
import { VehicleType } from '../../models/vehicleType/vehicle-type';
import { VehicleService } from '../../services/vehicle.service';
import { VehicleTypeService } from '../../services/vehicle-type.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  vehicleTypeList: VehicleType[] = [];
  datatable: any;
  vehicle: Vehicle = {
    brand: '',
    inventoryId: '',
    model: '',
    regNum: '',
    vehicleType: undefined,
    vincode: ''
  };

  private readonly tableParams: DataTables.Settings = {
    columnDefs: [
      {
        targets: [6, 7],
        orderable: false
      }
    ],
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    }
  };

  constructor(private serviceVehicle: VehicleService, private serviceVehicleType: VehicleTypeService,
    private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.serviceVehicleType.getEntities().subscribe(type => (this.vehicleTypeList = type));
    this.serviceVehicle.getEntities().subscribe(vehicles => {
      this.vehicles = vehicles;
      this.chRef.detectChanges();
      const table: any = $('table');
      this.datatable = table.DataTable(this.tableParams);
    });
  }

  addUser(vehicle: Vehicle) {
    this.vehicles = [...this.vehicles, vehicle];
  }

}
