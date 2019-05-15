import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from '../../../../environments/environment';
import { Document } from '../models/document';
import { Observable } from 'rxjs';
import { IssueLog } from '../models/issuelog';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends CrudService<Document> {
  protected readonly serviceUrl = `${environment.apiUrl}/document`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/document`;

  getEntitiesByIssueLogId(id: number): Observable<Array<Document>> {
    this.spinner.show();
    return this.http.get<Array<IssueLog>>(`${environment.apiUrl}/issuelog/${id}/document`).pipe(
      tap(data => this.handleSuccess('fetched data', data)),
      catchError(this.handleError())
    );
  }

  protected mapEntity(entity: Document): Document {
    return new Document(entity);
  }
}
