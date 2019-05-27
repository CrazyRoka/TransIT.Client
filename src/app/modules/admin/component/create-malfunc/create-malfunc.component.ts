import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Malfunction } from 'src/app/modules/shared/models/malfunction';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TEntity } from 'src/app/modules/core/models/entity/entity';
import { MalfunctionSubgroup } from 'src/app/modules/shared/models/malfunction-subgroup';
import { MalfunctionService } from 'src/app/modules/shared/services/malfunction.service';
import { MalfunctionGroup } from 'src/app/modules/shared/models/malfunction-group';
import { MalfunctionGroupService } from 'src/app/modules/shared/services/malfunction-group.service';
import { MalfunctionSubgroupService } from 'src/app/modules/shared/services/malfunction-subgroup.service';

@Component({
  selector: 'app-create-malfunc',
  templateUrl: './create-malfunc.component.html',
  styleUrls: ['./create-malfunc.component.scss']
})
export class CreateMalfuncComponent implements OnInit {
  @Output() createdMalfunction = new EventEmitter<Malfunction>();

  malfunctionForm: FormGroup;
  malfunctionSubgroupList: MalfunctionSubgroup[];
  malfunctionGroupList: MalfunctionGroup[];
  malfunctions: Malfunction[];

  malfunctionSubGroup: MalfunctionSubgroup;
  malfunctionGroup: MalfunctionGroup;

  @Input() set MalfunctionGroup(malfunctionGroup: MalfunctionGroup) {
    if (!malfunctionGroup) {
      this.malfunctionGroup = undefined;
      this.malfunctionForm.patchValue({ group: '' });
      this.malfunctionForm.controls.group.enable();
      return;
    }
    this.malfunctionGroup = this.malfunctionGroupList.find(g => g.id === malfunctionGroup.id);
    this.malfunctionForm.patchValue({ group: this.malfunctionGroup });
    this.malfunctionForm.controls.group.disable();
  }

  @Input() set MalfunctionSubGroup(malfunctionSub: MalfunctionSubgroup) {
    if (!malfunctionSub) {
      this.malfunctionSubGroup = undefined;
      this.malfunctionForm.patchValue({ subgroup: '' });
      this.malfunctionForm.controls.subgroup.enable();
      return;
    }
    this.malfunctionSubGroup = this.malfunctionSubgroupList.find(s => s.id === malfunctionSub.id);
    this.malfunctionForm.patchValue({ subgroup: this.malfunctionSubGroup });
    this.malfunctionForm.controls.subgroup.disable();
  }

  constructor(
    private serviceMalfunctionGroup: MalfunctionGroupService,
    private serviceMalfunctionSubgroup: MalfunctionSubgroupService,
    private serviceMalfunction: MalfunctionService,
    private formBuilder: FormBuilder,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.setUpForm();
    this.loadEntities();
  }

  compareEntity<T>(entity: TEntity<T>, otherEntity: TEntity<T>) {
    return entity && otherEntity ? entity.id === otherEntity.id : entity === otherEntity;
  }

  private get formValue() {
    return this.malfunctionForm.getRawValue();
  }

  get malfunctionSubgroupsFilteredByGroup(): MalfunctionSubgroup[] {
    const selectedGroup = this.formValue.group;
    const filteredSubgroups = this.filterSubgroupsByGroup(selectedGroup);
    return filteredSubgroups;
  }

  private filterSubgroupsByGroup(group: MalfunctionGroup): MalfunctionSubgroup[] {
    const subgroups = this.malfunctionSubgroupList;
    if (!group) {
      return subgroups;
    }
    const filteredSubgroups = this.malfunctionSubgroupList.filter(
      subgroup => subgroup.malfunctionGroup.name === group.name
    );

    if (this.notSelectedSubgroup(filteredSubgroups)) {
      this.setDefaultSubgroup();
    }
    return filteredSubgroups;
  }

  private notSelectedSubgroup(subgroups: MalfunctionSubgroup[]): boolean {
    return subgroups.findIndex(s => s === this.formValue.subgroup) === -1;
  }

  private setDefaultSubgroup(): void {
    this.malfunctionForm.patchValue({ subgroup: '' });
  }

  clickSubmit(button: HTMLButtonElement) {
    button.click();
    this.createMalfunction();
    this.setUpForm();
    this.hideModalWindow();
  }

  private setUpForm() {
    this.malfunctionForm = this.formBuilder.group({
      group: ['', Validators.required],
      subgroup: '',
      name: ['', Validators.required]
    });
  }
  private hideModalWindow() {
    const modalWindow: any = $('#createMalfunction');
    modalWindow.modal('hide');
  }

  loadEntities() {
    this.serviceMalfunctionGroup.getEntities().subscribe(malfunctionGroupList => {
      this.malfunctionGroupList = malfunctionGroupList;
    });
    this.serviceMalfunctionSubgroup.getEntities().subscribe(malfunctionSubGroupList => {
      this.malfunctionSubgroupList = malfunctionSubGroupList;
    });
  }

  private getDistinct<T extends TEntity<T>>(entities: T[]) {
    return entities.filter((value, index, self) => self.findIndex(item => item.id === value.id) === index);
  }

  private createMalfunction() {
    console.log(this.formValue);
    const malfunction = new Malfunction({
      name: this.formValue.name,
      malfunctionSubgroup: this.formValue.subgroup
    });
    this.serviceMalfunction
      .addEntity(malfunction)
      .subscribe(
        newMalfunction => this.createdMalfunction.next(newMalfunction),
        _ => this.toast.error('Не вдалось створити заявку', 'Помилка створення заявки')
      );
  }
}
