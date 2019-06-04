import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Document } from 'src/app/modules/shared/models/document';
import { IssueLog } from 'src/app/modules/shared/models/issuelog';
import { IssuelogService } from 'src/app/modules/shared/services/issuelog.service';
import { DocumentService } from 'src/app/modules/shared/services/document.service';
import { updateLocale } from 'moment';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss']
})
export class CreateDocumentComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Output() createDocument = new EventEmitter<Document>();
  @Input() issueLog;
  documentForm: FormGroup;
  issueLogList: IssueLog[];
  selectedFile = null;
  constructor(
    private serviceIssueLog: IssuelogService,
    private serviceDocument: DocumentService,
    private formBuilder: FormBuilder,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    $('#createDocument').on('hidden.bs.modal', function() {
      $(this)
        .find('form')
        .trigger('reset');
    });
    this.documentForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      path: ['', Validators.required]
    });
    this.serviceIssueLog.getEntities().subscribe(issuelog => {
      this.issueLogList = issuelog;
    });
  }
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
  clickSubmit() {
    if (this.documentForm.invalid) {
      return;
    }
    //uloadFileAdd
    const form = this.documentForm.value;
    const document: Document = {
      id: 0,
      name: form.name as string,
      description: form.description as string,
      issueLog: this.issueLog,
      path: form.path as string
    };

    this.serviceDocument.addEntity(document).subscribe(
      newGroup => {
        this.createDocument.next(newGroup);
      },
      error => this.toast.error('Неможливо додати документ', 'Помилка')
    );
    this.closeDiv.nativeElement.click();
  }
}
