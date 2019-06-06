import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from '../../../../environments/environment';
import { Document } from '../models/document';
import { getFromStorage, saveToStorage } from './serviceTools';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends CrudService<Document> {
  protected readonly serviceUrl = `${environment.apiUrl}/document`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/document`;

  get selectedItem(): Document {
    return this.mapEntity(getFromStorage('selectedDocument'));
  }
  set selectedItem(value: Document) {
    saveToStorage('selectedDocument', value);
  }

  addDocument(document: Document) {
    console.log(document);
    this.spinner.show();
    const formData = new FormData();
    for (const prop in document) {
      if (!document.hasOwnProperty(prop)) {
        continue;
      }
      formData.append(prop, document[prop]);
    }
    return this.http.post<Document>(this.serviceUrl, formData).pipe(
      map(addedEntity => this.mapEntity(addedEntity)),
      tap(data => this.handleSuccess('added document', data)),
      catchError(this.handleError())
    );
  }
  downloadFile(document: Document) {
    console.log(document);
    // this.spinner.show();
    //https://localhost:8080/api/v1/Document/2/file
    return this.http.get<FormData>(`${this.serviceUrl}/${document.id}/file`).pipe(catchError(this.handleError()));
  }

  protected mapEntity(entity: Document): Document {
    return new Document(entity);
  }
}
