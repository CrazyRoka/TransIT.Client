import { TEntity } from '../../models/entity/entity';

export class Currency extends TEntity<Currency> {
  id: number;
  shortName: string;
  fullName: string;
}
