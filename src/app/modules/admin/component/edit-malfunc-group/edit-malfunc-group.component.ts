import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import { MalfuncGroup } from '../../models/malfuncGroup/malfunc-group';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MalfuncGroupService } from '../../services/malfunc-group.service';

@Component({
  selector: 'app-edit-malfunc-group',
  templateUrl: './edit-malfunc-group.component.html',
  styleUrls: ['./edit-malfunc-group.component.scss']
})
export class EditMalfuncGroupComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input()
  set malfuncGroup(malfuncGroup: MalfuncGroup) {
    if (!malfuncGroup) {
      return;
    }
    this.malfunctionGroupForm.patchValue({ ...malfuncGroup});
  }
  @Output() updateMalfuncGroup = new EventEmitter<MalfuncGroup>();

  malfunctionGroupForm: FormGroup;


  constructor(private formBuilder: FormBuilder,private serviceMalfunctionGroupService: MalfuncGroupService) {}

  ngOnInit() {
    this.malfunctionGroupForm = this.formBuilder.group({
      id: '',
      name: ['', Validators.required]
    });
  }

  updateData() {
    if (this.malfunctionGroupForm.invalid) {
      return;
    }
    this.closeDiv.nativeElement.click();
    const form = this.malfunctionGroupForm.value;
    const malfuncGroup: MalfuncGroup = {
      id: form.id as number,
      name: form.name as string
    };
    this.serviceMalfunctionGroupService.updateEntity(malfuncGroup).subscribe(_ => this.updateMalfuncGroup.next(malfuncGroup));
  }
}


