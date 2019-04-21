import { TEntity } from 'src/app/modules/core/models/entity/entity';
import { MalfunctionGroup } from 'src/app/modules/register/models/malfunction-group';

export class MalfunSubgroup extends TEntity{
    id? :number;
    name : string;
    malfunctionGroup: MalfunctionGroup;
}
