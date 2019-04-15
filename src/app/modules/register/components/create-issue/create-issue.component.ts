import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ErrorMessage } from 'ng-bootstrap-form-validation';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss']
})
export class CreateIssueComponent implements OnInit {
  private issueForm: FormGroup;

  vehicles: string[] = ['Nissan', 'Audi'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.issueForm = this.fb.group({
      vehicle: ['', Validators.required],
      malfunctionGroup: '',
      malfunctionSubgroup: '',
      malfunction: ['', Validators.required],
      summary: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.issueForm.invalid) {
      return;
    }
  }

  clickSubmit(button: HTMLButtonElement) {
    button.click();
  }
}
