import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from '../../../../environments/environment';
import { Supplier } from '../models/supplier';
import { getFromStorage, saveToStorage } from '../../admin/services/serviceTools';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierService extends CrudService<Supplier> {
  protected readonly serviceUrl = `${environment.apiUrl}/supplier`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/supplier`;

  getFilteredEntities(params: any): Observable<Supplier> {
    return this.http.post<any>(this.datatableUrl, params, {}).pipe(
      map(response => {
        console.log(response); 
        return { ...response, data: response.data.map(d => this.mapEntity(d)) 
        }
      }),
      catchError(this.handleError())
    );
  }

  protected mapEntity(entity: Supplier): Supplier {
    return new Supplier(entity);
  }
}
