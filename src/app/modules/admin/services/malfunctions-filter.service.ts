import { Injectable } from '@angular/core';
import { MalfuncGroupService } from './malfunc-group.service';
import { MalfuncService } from './malfunc.service';
import { MalfunSubgroupService } from './malfun-subgroup.service';
import { MalfuncGroup } from '../models/malfuncGroup/malfunc-group';
import { MalfunSubgroup } from '../models/malfun-subgroup/malfun-subgroup';
import { Malfunction } from '../models/malfunc/malfunc';

@Injectable({
  providedIn: 'root'
})
export class MalfunctionsFilterService {
  constructor(
    private malfuncGroupService: MalfuncGroupService,
    private malfuncSubroupService: MalfunSubgroupService,
    private malfunctionService: MalfuncService
  ) {
    this.malfuncGroupService.getEntities().subscribe(x => (this.malfunctionGroups = x));
    this.malfuncSubroupService.getEntities().subscribe(x => (this.malfunctionSubGroups = x));
    this.malfunctionService.getEntities().subscribe(x => (this.malfunctions = x));
  }
  malfunctionGroups: MalfuncGroup[];
  malfunctionSubGroups: MalfunSubgroup[];
  malfunctions: Malfunction[];

  selectedMalfunctionGroup: MalfuncGroup;
  selectedMalfunctionSubGroup: MalfunSubgroup;
  selectedMalfunction: Malfunction;

  get filteredSubgroups(): MalfunSubgroup[] {
    return this.malfunctionSubGroups.filter(x => x.malfunctionGroup.id === this.selectedMalfunctionGroup.id);
  }
  get filteredMalfunctions(): Malfunction[] {
    return this.malfunctions.filter(x => x.malfunctionSubgroup.id === this.selectedMalfunctionSubGroup.id);
  }
}
