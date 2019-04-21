import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { MalfuncGroup } from '../../models/malfuncGroup/malfunc-group';
import { MalfuncGroupService } from '../../services/malfunc-group.service';

@Component({
  selector: 'app-delete-malfunc-group',
  templateUrl: './delete-malfunc-group.component.html',
  styleUrls: ['./delete-malfunc-group.component.scss']
})
export class DeleteMalfuncGroupComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input() malfuncGroup: MalfuncGroup;
  @Output() deleteUser = new EventEmitter<MalfuncGroup>();

  constructor(private service: MalfuncGroupService) {}

  ngOnInit() {}

  deleteMalgGroup() {
    console.log(this.malfuncGroup);
    this.closeDiv.nativeElement.click();
    this.service.deleteEntity(this.malfuncGroup.id).subscribe(data => {
    this.deleteUser.next(this.malfuncGroup);
    });
  }
}
