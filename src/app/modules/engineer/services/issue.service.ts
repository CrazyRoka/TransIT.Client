import { Injectable } from '@angular/core';
import {CrudService} from '../../core/services/crud.service';
import {Issue} from '../../core/models/issue';
import {HttpClient} from '@angular/common/http';
import {SpinnerService} from '../../core/services/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class IssueService extends CrudService<Issue> {
  constructor(
    http: HttpClient,
    spinner: SpinnerService
  ) {
    super(http, spinner);
  }
}
