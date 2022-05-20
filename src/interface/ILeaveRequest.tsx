export interface ILeaveRequest {
    id?:number
    Name: string;
    EmployeeId: string;
    LeaveType: string;
    LeaveFrom: Date;
    LeaveTo: Date;
    LeaveReason: string;
    Status?:string
  }

