import DateTimeFormat = Intl.DateTimeFormat;

export class IssueDetail {
  ID: number;
  SUNNARY: string;
  WARRANTY: number;
  DEADLINE: DateTimeFormat;
  STATE_ID: number;
  ASSIGNED_TO: number;
  VEHICLE_ID: number;
  MALFUNCTION_ID: number;
  CREATE_DATE: DateTimeFormat
  MOD_DARE: DateTimeFormat;
  CREATE_ID: number;
  MOD_ID: number;
}
