import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/modules/engineer/models/supplier';
import { SupplierService } from 'src/app/modules/engineer/services/supplier.service';
import { Router } from '@angular/router';

declare const $;

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  
  public suppliers: Array<Supplier>;
  private table: any;

  constructor(
    private supplierSevice: SupplierService,
    private router: Router
  ) {}

  ngOnInit() {
    this.table = $('#supplier-table').DataTable({
      responsive: true,
      select: {
        style: 'single'
      },
      columns: [
        { data: 'id', bVisible: false },
        { title: '', data: 'name', defaultContent: '' },
      ],
      paging: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    });
    this.table.on('select', (e, dt, type, indexes) => {
      const item = this.table.rows( indexes ).data()[0];
      this.router.navigate(['/admin/supplier/edit', item]);
    });
    this.supplierSevice.getEntities().subscribe(suppliers => {
      this.suppliers = suppliers;
      this.table.rows.add(this.suppliers);
      this.table.draw();
    });
  }

}
