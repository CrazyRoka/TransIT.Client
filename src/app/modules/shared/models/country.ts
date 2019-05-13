import { TEntity } from '../../models/entity/entity';

export class Country extends TEntity<Country> {
  id: number;
  name: string;
}
