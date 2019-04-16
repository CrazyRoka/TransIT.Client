import { State } from './state';
import { Malfunction } from './malfunction';
import { Vehicle } from './vehicle';

export class Issue {
  id?: number;
  state?: State;
  malfunction: Malfunction;
  vehicle: Vehicle;
  summary: string;
}
