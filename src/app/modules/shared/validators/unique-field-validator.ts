import { TEntity } from '../../core/models/entity/entity';
import { CrudService } from '../../core/services/crud.service';
import { FormGroup, AbstractControl } from '@angular/forms';
import { timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

// export const uniqueFieldValidator = <T extends TEntity<T>>(
//   service: CrudService<T>,
//   fieldName: string,
//   time: number = 500
// ) => {
//   return (group: FormGroup) => {
//     return timer(time).pipe(
//       switchMap(() =>
//         service.getFilteredEntities({
//           filters: [{ entityPropertyPath: group[fieldName], operator: '==', value: group[fieldName].value }]
//         })
//       ),
//       map(res => (res.data.length === 0 ? null : { uniqueViolation: true }))
//     );
//   };
// };

export class UniqueFieldValidator {
  static createValidator<T extends TEntity<T>>(service: CrudService<T>, fieldName: string, time: number = 500) {
    return (control: AbstractControl) => {
      return timer(time).pipe(
        switchMap(() =>
          service.getFilteredEntities({
            filters: [{ entityPropertyPath: fieldName, operator: '==', value: control.value }]
          })
        ),
        map(res => (res.data.length === 0 ? null : { uniqueViolation: true }))
      );
    };
  }
}
