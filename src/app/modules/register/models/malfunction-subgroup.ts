import { MalfunctionGroup } from './malfunction-group';
import { TEntity } from '../../core/models/entity/entity';

export class MalfunctionSubgroup extends TEntity<MalfunctionSubgroup> {
  name: string;
  malfunctionGroup: MalfunctionGroup;
}
