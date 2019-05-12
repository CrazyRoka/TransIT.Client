import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Country } from '../../../../models/country';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CountryService } from '../../../../services/country.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-country',
  templateUrl: './create-country.component.html',
  styleUrls: ['./create-country.component.scss']
})
export class CreateCountryComponent implements OnInit {
  @ViewChild('close') closeCreateModal: ElementRef;
  @Output() createCountry = new EventEmitter<Country>();
  countryForm: FormGroup;
  constructor(private service: CountryService, private formBuilder: FormBuilder, private toast: ToastrService) {}

  ngOnInit() {
    $('#createCountry').on('hidden.bs.modal', function() {
      $(this)
        .find('form')
        .trigger('reset');
    });

    this.countryForm = this.formBuilder.group({
      name: new FormControl('', Validators.required)
    });
  }
  clickSubmit() {
    if (this.countryForm.invalid) {
      return;
    }
    const form = this.countryForm.value;
    const country: Country = new Country({
      name: form.name
    });

    this.service.addEntity(country).subscribe(
      newCountry => {
        this.createCountry.next(newCountry);
        this.toast.success('', 'Країну створено');
      },
      error => this.toast.error('Помилка', 'Країна вже створена')
    );
    this.closeCreateModal.nativeElement.click();
  }
}
