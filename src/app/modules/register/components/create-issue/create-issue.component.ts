import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ErrorMessage } from 'ng-bootstrap-form-validation';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss']
})
export class CreateIssueComponent implements OnInit {
  private issueForm: FormGroup;

  vehicles: Vehicle[] = [];

  constructor(private fb: FormBuilder, private vehicleService: VehicleService) {}

  ngOnInit() {
    this.issueForm = this.fb.group({
      vehicle: ['', Validators.required],
      malfunctionGroup: '',
      malfunctionSubgroup: '',
      malfunction: ['', Validators.required],
      summary: ['', Validators.required]
    });

    this.vehicleService.getEntities().subscribe(data => (this.vehicles = data));
  }

  onSubmit() {
    if (this.issueForm.invalid) {
      return;
    }
  }

  clickSubmit(button: HTMLButtonElement) {
    button.click();
  }

  get vehiclesNames(): string[] {
    return this.vehicles.map(
      vehicle => `${vehicle.brand} ${vehicle.model} ${vehicle.vincode || ''} ${vehicle.inventoryId || ''} ${vehicle.regNum || ''}`
    );
  }
}
