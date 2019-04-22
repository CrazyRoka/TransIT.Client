import {Issue} from './issue';
import {State} from './state';
import {ActionType} from './actionType';
import {Supplier} from './supplier';
import {User} from './user';

export class IssueLog {
  constructor(
    public id?: number,
    public description?: string,
    public expenses?: number,
    public actionType?: ActionType,
    public issue?: Issue,
    public newState?: State,
    public oldState?: State,
    public supplier?: Supplier,
    public create?: User,
    public mod?: User,
    public createDate?: Date,
    public modDate?: Date
  ) {}
}
