import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from 'src/environments/environment';
import { Malfunction } from '../models/malfunc/malfunc';

@Injectable({
  providedIn: 'root'
})
export class MalfuncService extends CrudService<Malfunction> {
  protected readonly serviceUrl = `${environment.apiUrl}/malfunction`;
}
