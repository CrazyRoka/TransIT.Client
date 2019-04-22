import { MalfunctionSubgroup } from './malfunction-subgroup';
import { TEntity } from '../../core/models/entity/entity';

export class Malfunction extends TEntity<Malfunction> {
  name: string;
  malfunctionSubgroup: MalfunctionSubgroup;
}
