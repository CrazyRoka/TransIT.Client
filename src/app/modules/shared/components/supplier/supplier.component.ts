import { Component, OnInit, Input } from '@angular/core';
import { SupplierService } from 'src/app/modules/shared/services/supplier.service';
import { Supplier } from 'src/app/modules/shared/models/supplier';
import { Router } from '@angular/router';

declare const $;

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  suppliers: Supplier[];
  supplier: Supplier;
  dataTable: DataTables.Api;
  @Input() isVisible: boolean;

  constructor(private service: SupplierService, private router: Router) {}
  _url = this.router.url.substring(1, this.router.url.length - 1);

  ngOnInit() {

    this._url = this._url.substring(0, this._url.indexOf('/'));
    this.isVisibleCheck();

    $('#supplier-table').DataTable({
      scrollX: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      },
      columns: [
        {
          title: 'Коротка назва'
        },
        {
          title: 'Повна назва'
        },
        {
          title: 'Країна'
        },
        {
          title: 'Валюта'
        },
        {
          title: 'ЄДРПОУ'
        },
        {
          title: 'Дії',
          orderable: false,
          visible: this.isVisible
        }
      ],
      // processing: true,
      // serverSide: true,
      // ajax: this.ajaxCallback.bind(this),
    });
    this.service.getEntities().subscribe(suppliers => {
      this.addTableData(suppliers);
    });
  }

  // private ajaxCallback(dataTablesParameters: any, callback): void {
  //   this.service.getFilteredEntities(dataTablesParameters).subscribe(callback);
  // }

  addTableData(newSuppliers: Supplier[]) {
    this.suppliers = [...newSuppliers];
    const view = newSuppliers.map(i => [
      i.name,
      i.fullName,
      i.country,
      i.currency,
      i.edrpou,
      `<button id="supplier-${i.id}" class="btn" data-toggle="modal" data-target="#editSupplier"><i class="fas fa-edit"></i></button>
     <button id="supplier-${i.id}" class="btn" data-toggle="modal" data-target="#deleteSupplier"><i class="fas fas fa-trash-alt"></i></button>`
  
    ]);

    this.dataTable = $('#supplier-table')
      .dataTable()
      .api()
      .clear()
      .rows.add(view)
      .draw();

    $('#supplier-table tbody').on('click', 'button', event => {
      const idTokens = event.currentTarget.id.split('-');
      const id = parseInt(idTokens[idTokens.length - 1], 10);
      this.supplier = this.suppliers.find(i => i.id === id);
    });
  }

  addItem(supplier: Supplier) {
    this.suppliers.push(supplier);
    this.dataTable.draw();
    console.log(supplier);
  }

  deleteSupplier(supplier: Supplier) {
    this.suppliers.splice(this.suppliers.findIndex(i => i.id === supplier.id), 1);
    this.addTableData(this.suppliers);
  }

  updateSupplier(supplier: Supplier) {
    this.suppliers[this.suppliers.findIndex(i => i.id === supplier.id)] = supplier;
    this.service.getEntities().subscribe(suppliers => {
      this.addTableData(suppliers);
    });
  }

  isVisibleCheck() {
    if (this._url === 'admin') this.isVisible = true;
    else this.isVisible = false;
  }
}

