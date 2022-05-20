import { IProfileRequest } from "../interface/IProfileRequest";

const userLocalData = localStorage.getItem("user");
console.log(userLocalData);
var userDetails: IProfileRequest;
if (userLocalData === null || userLocalData === undefined) {
  userDetails = {
    id: 0,
    EmployeeId: "",
    FirstName: "",
    LastName: "",
    EmailAddress: "",
    MobileNumber: 0,
    DOB: new Date(),
    JoinedDate: new Date(),
    Supervisor: "",
    Department: "",
    Role: "",
    PermanentAddress: "",
    TemporaryAddress: "",
    Password: "",
    Designation:"",
    GithubId:"",
    SkypeId:"",
    Image:""
  };
} else {
  userDetails = JSON.parse(userLocalData || "");
}
export default userDetails;


