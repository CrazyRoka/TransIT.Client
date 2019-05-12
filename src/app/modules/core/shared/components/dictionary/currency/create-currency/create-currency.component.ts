import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Currency } from '../../../../models/currency';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CurrencyService } from '../../../../services/currency.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-currency',
  templateUrl: './create-currency.component.html',
  styleUrls: ['./create-currency.component.scss']
})
export class CreateCurrencyComponent implements OnInit {
  @ViewChild('close') closeCreateModal: ElementRef;
  @Output() createCurrency = new EventEmitter<Currency>();
  currencyForm: FormGroup;
  constructor(private service: CurrencyService, private formBuilder: FormBuilder, private toast: ToastrService) {}

  ngOnInit() {
    $('#createCurrency').on('hidden.bs.modal', function() {
      $(this)
        .find('form')
        .trigger('reset');
    });
    this.currencyForm = this.formBuilder.group({
      shortName: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required)
    });
  }
  clickSubmit() {
    if (this.currencyForm.invalid) {
      return;
    }
    const form = this.currencyForm.value;
    const country: Currency = new Currency({
      shortName: form.shortName,
      fullName: form.fullName
    });

    this.service.addEntity(country).subscribe(
      newCurrency => {
        this.createCurrency.next(newCurrency);
        this.toast.success('', 'Валюту створено');
      },
      error => this.toast.error('Помилка', 'Валюта вже створена')
    );
    this.closeCreateModal.nativeElement.click();
  }
}
