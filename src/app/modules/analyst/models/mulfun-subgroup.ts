import { TEntity } from '../../core/models/entity/entity';

export class MalfunSubgroup extends TEntity<MalfunSubgroup> {
  name: string;
  malfunctionGroup: MalfuncGroup;
}
