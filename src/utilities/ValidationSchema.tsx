import * as yup from "yup";

export const schema = yup.object().shape({
  firstName: yup.string().required("Please enter your first name"),
  lastName: yup.string().required("Please enter your first name"),
  emailAddress: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email address"),
  employeeId: yup.string().required("Please enter your employee id"),
  permanentAddress: yup
    .string()
    .required("Please enter your permanent address"),
  tempAddress: yup.string().required("Please enter your temporary address"),
  dob: yup
    .date()
    .required("Please enter your date of birth")
    .typeError("Invalid Date"),
  joinedDate: yup
    .date()
    .required("Please enter the date you joined the company.")
    .typeError("Invalid Date"),
  mobileNumber: yup.string().required("Please enter your mobile number"),
  password: yup.string().min(6).max(20).required("Please enter your password"),
  eventFrom: yup.date()
  .required("Please enter the date of the event.")
  .typeError("Invalid Date"),
  eventTo: yup.date()
  .required("Please enter the date of the event.")
  .typeError("Invalid Date"),
  eventName: yup.string().required("Please enter the name of the event"),
  eventType: yup.string().required("Please enter the event type"),
  projectName: yup.string().required("Please enter the name of the project"),
  teamLead: yup.string().required("Please enter the name of the your team leader"),
  startDate: yup
  .date()
  .required("Please enter the project start date.")
  .typeError("Invalid Date"),
  endDate: yup
  .date()
  .required("Please enter the project start date.")
  .typeError("Invalid Date"),
});
