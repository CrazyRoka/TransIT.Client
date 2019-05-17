import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Documents } from '../../models/document/document';
import { DocumentService } from '../../services/document.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare const $;

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  documents: Documents[] = [];
  tableDocument: DataTables.Api;
  selectedDocument: Documents;

  constructor(private documentService: DocumentService, private router: Router, private toast: ToastrService) {}

  private readonly tableConfig: DataTables.Settings = {
    responsive: true,

    columns: [
      { title: 'Назва', data: 'name', defaultContent: '' },
      { title: 'Опис', data: 'description', defaultContent: '' },
      { title: 'Змінено', data: 'modDate', defaultContent: '' },
      { data: 'id', visible: false },
      { title: 'Дії⠀', orderable: false },

    ],
    processing: true,
    serverSide: true,
    ajax: this.ajaxCallback.bind(this),
    columnDefs: [
      {
        targets: -1,
        data: null,
        defaultContent: `<button class="btn" data-toggle="modal" data-target="#editDocument"><i class="fas fa-edit"></i></button>
         <button class="btn" data-toggle="modal" data-target="#deleteDocument"><i class="fas fas fa-trash-alt"></i></button>
         <button class="btn" data-toggle="modal"><i class="fas fa-info-circle"></i></button>`
      }
    ],
    paging: true,
    scrollX: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    }
  };

  ngOnInit() {
    
    this.tableDocument = $('#document-table').DataTable(this.tableConfig);
    console.dir(this.tableDocument);

    this.addTableData();
  }

  private ajaxCallback(dataTablesParameters: any, callback): void {
    this.documentService.getFilteredEntities(dataTablesParameters).subscribe(callback);
  }

  addTableData() {
    $('#document-table tbody').on('click', 'button', function() {
      const index = this.tableDocument.row( $(this).parents('tr') ).data();
      console.log(index);
    }.bind(this));
  }

  addDocument(document: Documents) {
    this.documents.push(document);
  }

  deleteDocument(document: Documents) {
    this.documents = this.documents.filter(v => v.id !== document.id);
    this.tableDocument
      .rows($(`button[id^="document-${document.id}"]`).parents('tr'))
      .remove()
      .draw(false);
  }

  editDocument(document: Documents) {
    this.documents[this.documents.findIndex(i => i.id === document.id)] = document;
    this.documentService.getEntities().subscribe(vehicles => {
      // this.addTableData(vehicles);
    });
  }
}
