export class IssueLog {
  id: number;
  description: string;
  expenses: number;
  oldStateId: number;
  newStateId: number;
  supplierId: number;
  actionTypeId: number;
  issueId: number;
  createDate: Date;
  modDate: Date;
  createId: number;
  modId: number;
}
