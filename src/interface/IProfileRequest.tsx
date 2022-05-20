export interface IProfileRequest {
  id?: number;
  Image?: string;
  EmployeeId: string;
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  MobileNumber: number;
  DOB: Date;
  JoinedDate: Date;
  Supervisor: string;
  Department: string;
  Role: string;
  PermanentAddress: string;
  TemporaryAddress: string;
  Password: string;
  SkypeId:string;
  Designation:string;
  GithubId:string;

}

export interface IMultiSelectOptions {
  name: string; 
  image?: string; 
  id?: number;
}