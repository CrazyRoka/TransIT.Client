import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Supplier } from 'src/app/modules/engineer/models/supplier';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.scss']
})
export class CreateSupplierComponent implements OnInit {
  @Output() public createSupplier: EventEmitter<Supplier>; 
  public supplierForm: FormGroup;
  public supplier: Supplier;

  constructor(private activatedRoute: ActivatedRoute) {
    this.createSupplier = new EventEmitter<Supplier>();
    this.supplierForm = new FormGroup({
      name: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(100)])
      ),
      description: new FormControl('', Validators.maxLength(512))
    });
  }

  private newSupplier(): Supplier {
    return new Supplier({ name: ''});
  }

  ngOnInit() {
    this.supplier = this.newSupplier();
    this.activatedRoute.params.subscribe(res => {
      this.supplier = new Supplier(res);
    });
    $('#createSupplier').on('hidden.bs.modal', () => {
      $(this)
        .find('form')
        .trigger('reset');
    });
  }

  public onSubmit(): void {
    if (this.supplierForm.invalid) {
      alert('Invalid');
      return;
    }
    this.createSupplier.emit(
      new Supplier({
        id: 0,
        name: this.supplierForm.value.name
        })
    );
  }
}
