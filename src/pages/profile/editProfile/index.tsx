import React, { useState, useEffect } from "react";
import NavBar from "../../../components/navBar";

import {
  ContainerStyles,
  FlexContainer,
  InputFlexContainer,
  InputFlexContainerContents,
  PageContainer,
} from "../../../styles/Container.styled";
import { SectionTitleStyles } from "../../../styles/sectionTitle.styled";
import UserImage from "../../../images/UserImage.png";
import { ProfileInputFieldStyles } from "../../../components/inputFields/InputFields.styled";
import {
  BorderStyles,
  ImageHover,
  InputContainerContents,
} from "../Profile-Style";
import { ProfileButton } from "../../../components/buttons/Buttons.styled";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SideBar from "../../../components/sideBar";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  addEmployeesAsync,
  createEmployeeProfile,
  employeeUpdated,
  profileDetailsAsync,
  updateEmployeeAsync,
} from "../reducer";
import { profileDetails, profileDetail } from "../selector";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { viewDetails } from "../../../components/modal/addEventsModal/selector";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface ProfileBody {
  sideBar: boolean;
}

type ProfileSubmitForm = {
  Image: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  mobileNumber: number;
  dob: Date;
  joinedDate: Date;
  supervisor: string;
  department: string;
  role: string;
  permanentAddress: string;
  temporaryAddress: string;
  designation: string;
  skypeId:string;
  githubId:string;
};

const UserProfile = (props: ProfileBody) => {
  let history = useHistory();
  const dispatch = useAppDispatch();
  const users = useAppSelector(profileDetails);
  const updateUsers = useAppSelector(profileDetail);
  const canView = useAppSelector(viewDetails);

  const schema = yup.object().shape({
    firstName: yup.string().required("Please enter your first name"),
    lastName: yup.string().required("Please enter your first name"),
    emailAddress: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email address"),
    employeeId: yup.string().required("Please enter your employee id"),
    skypeId: yup.string().required("Please enter your skype id"),
    githubId: yup.string().required("Please enter your github id"),
    permanentAddress: yup
      .string()
      .required("Please enter your permanent address"),
    temporaryAddress: yup
      .string()
      .required("Please enter your temporary address"),
    dob: yup
      .date()
      .default(() => new Date())
      .required("Please enter your date of birth")
      .typeError("Invalid Date"),
    joinedDate: yup
      .date()
      .default(() => new Date())
      .min(yup.ref("dob"), "Joined date cannot be before birth date")
      .required("Please enter the date you joined the company.")
      .typeError("Invalid Date"),
    mobileNumber: yup
      .number()
      .min(10, "Must be more than 10 characters")
      .required("This field is required"),
    role: yup.string().required("Please select your role"),
    designation: yup.string().required("Please enter your designation"),
    supervisor: yup.string().required("Please select your supervisor."),
    department: yup.string().required("Please enter your department"),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProfileSubmitForm>({
    resolver: yupResolver(schema),
  });

  const location = useLocation();

  const [action, setAction] = useState("");
  const employeeId = useParams();

  const [textValues, setDefaultValue] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
    mobileNumber: 0,
    dob: new Date(),
    joinedDate: new Date(),
    supervisor: "",
    department: "",
    role: "",
    permanentAddress: "",
    temporaryAddress: "",
    designation: "",
    skypeId: "",
    githubId: "",
    // Image:{}
  });
  const [isSetValue, updateFlag] = useState(true);

  useEffect(() => {
    dispatch(profileDetailsAsync());
    if (location.pathname.toLowerCase().includes("edit-profile")) {
      setAction("update");
      Object.values(employeeId).forEach((element) => {
        dispatch(employeeUpdated({ id: Number(element), users: users }));
      });
    } else if (location.pathname.toLowerCase().includes("adduser")) {
      setAction("insert");
      dispatch(createEmployeeProfile());
    }
  }, [location]);

  const submitForm = (data: ProfileSubmitForm) => {
    const employeeData = {
      Image: "../images/UserImage.png",
      EmployeeId: data.employeeId,
      FirstName: data.firstName,
      LastName: data.lastName,
      EmailAddress: data.emailAddress,
      MobileNumber: data.mobileNumber,
      DOB: data.dob,
      JoinedDate: data.joinedDate,
      Supervisor: data.supervisor,
      Department: data.department,
      Role: data.role,
      PermanentAddress: data.permanentAddress,
      TemporaryAddress: data.temporaryAddress,
      Password: "abc123",
      SkypeId: data.skypeId,
      GithubId: data.githubId,
      Designation:data.designation
    };
    if (action === "insert") {
      dispatch(addEmployeesAsync({ addEmployees: employeeData })).then(() => {
        reset();
        history.push('/employees');
      });

    } else if (action === "update") {
      Object.values(employeeId).forEach((element) => {
        dispatch(
          updateEmployeeAsync({
            addEmployees: employeeData,
            id: Number(element),
          
          })
        ).then(()=>{
          history.push('/employees');
        })
        
      });
    }

  };

  useEffect(() => {
    register("department");
    register("dob");
    register("emailAddress");
    register("employeeId");
    register("firstName");
    register("joinedDate");
    register("lastName");
    register("mobileNumber");
    register("permanentAddress");
    register("designation");
    register("role");
    register("supervisor");
    register("temporaryAddress");
    updateFlag(false);
  }, [register]);

  useEffect(() => {
    if (action !== "" && users && !isSetValue) {
      updateFlag(true);
      setDefaultValue({
        department: updateUsers.Department,
        dob: new Date(updateUsers.DOB),
        emailAddress: updateUsers.EmailAddress,
        employeeId: updateUsers.EmployeeId,
        firstName: updateUsers.FirstName,
        joinedDate: new Date(updateUsers.JoinedDate),
        lastName: updateUsers.LastName,
        mobileNumber: updateUsers.MobileNumber,
        permanentAddress: updateUsers.PermanentAddress,
        role: updateUsers.Role,
        supervisor: updateUsers.Supervisor,
        temporaryAddress: updateUsers.TemporaryAddress,
        // designation:updateUsers.Designation
        designation: "",
        skypeId:"",
        githubId:''
      });
      setValue("employeeId", updateUsers.EmployeeId);
      setValue("firstName", updateUsers.FirstName);
      setValue("lastName", updateUsers.LastName);
      setValue("emailAddress", updateUsers.EmailAddress);
      setValue("mobileNumber", updateUsers.MobileNumber);
      setValue("dob", new Date(updateUsers.DOB));
      setValue("joinedDate", new Date(updateUsers.JoinedDate));
      setValue("supervisor", updateUsers.Supervisor);
      setValue("department", updateUsers.Department);
      setValue("designation", updateUsers.Designation);
      setValue("skypeId", updateUsers.SkypeId);
      setValue("githubId", updateUsers.GithubId);
      setValue("role", updateUsers.Role);
      setValue("permanentAddress", updateUsers.PermanentAddress);
      setValue("temporaryAddress", updateUsers.TemporaryAddress);
    }
  }, [users, action, updateUsers, isSetValue, setValue]);

  const [file, setFile] = useState("");

  const handleChange = (e: any) => {
    if (e) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <>
      <NavBar />
      <PageContainer>
        <SideBar />
        <ContainerStyles sideBarWidth={props.sideBar}>
          <SectionTitleStyles>
            <h4>Edit Profile</h4>
          </SectionTitleStyles>
          <BorderStyles>
            <form onSubmit={handleSubmit(submitForm)}>
              <FlexContainer>
                <InputContainerContents>
                  <ImageHover>
                    {file ? (
                      <img src={file} alt="User Image" />
                    ) : (
                      <img src={UserImage} alt="User Image" />
                    )}
                    <input type="file" onChange={handleChange} />
                  </ImageHover>
                </InputContainerContents>
                <InputContainerContents>
                  <InputFlexContainer>
                    <InputFlexContainerContents>
                      <ProfileInputFieldStyles>
                        <label>Employee Id</label>
                        <input
                          defaultValue={textValues.employeeId}
                          type="text"
                          {...register("employeeId")}
                          placeholder="Employee Id"
                          autoFocus
                          readOnly={canView}
                          onChange={(e) => {
                            setValue("employeeId", e.currentTarget.value, {
                              shouldValidate: true,
                              shouldDirty: true,
                            });
                            setDefaultValue({
                              ...textValues,
                              employeeId: e.currentTarget.value,
                            });
                          }}
                        ></input>
                        <p>{errors.employeeId?.message}</p>
                      </ProfileInputFieldStyles>
                    </InputFlexContainerContents>
                  </InputFlexContainer>
                  <InputFlexContainer>
                    <InputFlexContainerContents>
                      <ProfileInputFieldStyles>
                        <label>First Name</label>
                        <input
                          type="text"
                          placeholder="First Name"
                          {...register("firstName")}
                          readOnly={canView}
                          onChange={(e) => {
                            setValue("firstName", e.currentTarget.value, {
                              shouldValidate: true,
                              shouldDirty: true,
                            });
                            setDefaultValue({
                              ...textValues,
                              firstName: e.currentTarget.value,
                            });
                          }}
                        ></input>
                        <p>{errors.firstName?.message}</p>
                      </ProfileInputFieldStyles>
                    </InputFlexContainerContents>
                    <InputFlexContainerContents>
                      <ProfileInputFieldStyles>
                        <label>Last Name</label>
                        <input
                          type="text"
                          placeholder="Last Name"
                          {...register("lastName")}
                          readOnly={canView}
                          onChange={(e) => {
                            setValue("lastName", e.currentTarget.value, {
                              shouldValidate: true,
                              shouldDirty: true,
                            });
                            setDefaultValue({
                              ...textValues,
                              lastName: e.currentTarget.value,
                            });
                          }}
                        ></input>
                        <p>{errors.lastName?.message}</p>
                      </ProfileInputFieldStyles>
                    </InputFlexContainerContents>
                    <InputFlexContainerContents>
                      <ProfileInputFieldStyles>
                        <label>Email ID</label>
                        <input
                          type="text"
                          {...register("emailAddress")}
                          placeholder="Email ID"
                          readOnly={canView}
                          onChange={(e) => {
                            setValue("emailAddress", e.currentTarget.value, {
                              shouldValidate: true,
                              shouldDirty: true,
                            });
                            setDefaultValue({
                              ...textValues,
                              emailAddress: e.currentTarget.value,
                            });
                          }}
                        ></input>
                        <p>{errors.emailAddress?.message}</p>
                      </ProfileInputFieldStyles>
                    </InputFlexContainerContents>
                    <InputFlexContainerContents>
                      <ProfileInputFieldStyles>
                        <label>Mobile No</label>
                        <input
                          type="number"
                          {...register("mobileNumber")}
                          placeholder="Mobile No"
                          readOnly={canView}
                          onChange={(e) => {
                            setValue(
                              "mobileNumber",
                              Number(e.currentTarget.value),
                              {
                                shouldValidate: true,
                                shouldDirty: true,
                              }
                            );
                            setDefaultValue({
                              ...textValues,
                              mobileNumber: Number(e.currentTarget.value),
                            });
                          }}
                        ></input>
                        <p>{errors.mobileNumber?.message}</p>
                      </ProfileInputFieldStyles>
                    </InputFlexContainerContents>
                   
                    <InputFlexContainerContents>
                      <ProfileInputFieldStyles>
                        <label>Permanent Address</label>
                        <input
                          type="text"
                          {...register("permanentAddress")}
                          placeholder="Permanent Address"
                          readOnly={canView}
                          onChange={(e) => {
                            setValue(
                              "permanentAddress",
                              e.currentTarget.value,
                              {
                                shouldValidate: true,
                                shouldDirty: true,
                              }
                            );
                            setDefaultValue({
                              ...textValues,
                              permanentAddress: e.currentTarget.value,
                            });
                          }}
                        ></input>
                        <p>{errors.permanentAddress?.message}</p>
                      </ProfileInputFieldStyles>
                    </InputFlexContainerContents>
                    <InputFlexContainerContents>
                      <ProfileInputFieldStyles>
                        <label>Temporary Address</label>
                        <input
                          type="text"
                          {...register("temporaryAddress")}
                          placeholder="Temporary Address"
                          readOnly={canView}
                          onChange={(e) => {
                            setValue(
                              "temporaryAddress",
                              e.currentTarget.value,
                              {
                                shouldValidate: true,
                                shouldDirty: true,
                              }
                            );
                            setDefaultValue({
                              ...textValues,
                              temporaryAddress: e.currentTarget.value,
                            });
                          }}
                        ></input>
                        <p>{errors.temporaryAddress?.message}</p>
                      </ProfileInputFieldStyles>
                    </InputFlexContainerContents>
                    <InputFlexContainerContents>
                      <ProfileInputFieldStyles>
                        <label>Date of Birth</label>
                        <DatePicker
                          selected={textValues.dob}
                          required
                          readOnly={canView}
                          {...register("dob")}
                          onChange={(data: Date) => {
                            setValue("dob", data, {
                              shouldValidate: true,
                              shouldDirty: true,
                            });
                            setDefaultValue({
                              ...textValues,
                              dob: data,
                            });
                          }}
                        />
                        <p>{errors.dob?.message}</p>
                      </ProfileInputFieldStyles>
                    </InputFlexContainerContents>
                    <InputFlexContainerContents>
                      <ProfileInputFieldStyles>
                        <label>Joined Date</label>
                        <DatePicker
                          selected={textValues.joinedDate}
                          required
                          readOnly={canView}
                          {...register("joinedDate")}
                          onChange={(data: Date) => {
                            setValue("joinedDate", data, {
                              shouldValidate: true,
                              shouldDirty: true,
                            });
                            setDefaultValue({
                              ...textValues,
                              joinedDate: data,
                            });
                          }}
                        />
                        <p>{errors.joinedDate?.message}</p>
                      </ProfileInputFieldStyles>
                    </InputFlexContainerContents>
                    <InputFlexContainerContents>
                      <ProfileInputFieldStyles>
                        <label>Designation</label>
                        <input
                          type="text"
                          {...register("designation")}
                          placeholder="Designation"
                          readOnly={canView}
                          onChange={(e) => {
                            setValue("designation", e.currentTarget.value, {
                              shouldValidate: true,
                              shouldDirty: true,
                            });
                            setDefaultValue({
                              ...textValues,
                              designation: e.currentTarget.value,
                            });
                          }}
                        ></input>
                        <p>{errors.designation?.message}</p>
                      </ProfileInputFieldStyles>
                    </InputFlexContainerContents>
                    <InputFlexContainerContents>
                      <ProfileInputFieldStyles>
                        <label>Supervisor</label>
                        <select {...register("supervisor")} id="supervisors">
                          <option value="">Supervisor</option>
                          <option value="Shawn Barber">Shawn Barber</option>
                          <option value="Suraj Vaidya">Suraj Vaidya</option>
                          <option value="Satij Dangol">Satij Dangol</option>
                          <option value="Kreeti Karmacharya">
                            Kreeti Karmacharya
                          </option>
                        </select>
                        <p>{errors.supervisor?.message}</p>
                      </ProfileInputFieldStyles>
                    </InputFlexContainerContents>
                    <InputFlexContainerContents>
                      <ProfileInputFieldStyles>
                        <label>Role</label>
                        <select {...register("role")} id="roles">
                          <option value="">Select Role Type</option>
                          <option value="Admin">Admin</option>
                          <option value="Supervisor">Supervisor</option>
                          <option value="Employee">Employee</option>
                        </select>
                        <p>{errors.role?.message}</p>
                      </ProfileInputFieldStyles>
                    </InputFlexContainerContents>

                    <InputFlexContainerContents>
                      <ProfileInputFieldStyles>
                        <label>Department</label>
                        <select {...register("department")} id="departments">
                          <option value="">Department</option>
                          <option value="Frontend">Frontend</option>
                          <option value="Backend">Backend</option>
                          <option value="Data">Data</option>
                          <option value="Management">Management</option>
                        </select>
                        <p>{errors.role?.message}</p>
                      </ProfileInputFieldStyles>
                    </InputFlexContainerContents>

                    <InputFlexContainerContents>
                      <ProfileInputFieldStyles>
                        <label>Skype Id</label>
                        <input
                          type="text"
                          {...register("skypeId")}
                          placeholder="Skype Id"
                          readOnly={canView}
                          onChange={(e) => {
                            setValue("skypeId", e.currentTarget.value, {
                              shouldValidate: true,
                              shouldDirty: true,
                            });
                            setDefaultValue({
                              ...textValues,
                              skypeId: e.currentTarget.value,
                            });
                          }}
                        ></input>
                        <p>{errors.skypeId?.message}</p>
                      </ProfileInputFieldStyles>
                    </InputFlexContainerContents>
                    <InputFlexContainerContents>
                      <ProfileInputFieldStyles>
                        <label>Github Id</label>
                        <input
                          type="text"
                          {...register("githubId")}
                          placeholder="Github Url"
                          readOnly={canView}
                          onChange={(e) => {
                            setValue("githubId", e.currentTarget.value, {
                              shouldValidate: true,
                              shouldDirty: true,
                            });
                            setDefaultValue({
                              ...textValues,
                              githubId: e.currentTarget.value,
                            });
                          }}
                        ></input>
                        <p>{errors.githubId?.message}</p>
                      </ProfileInputFieldStyles>
                    </InputFlexContainerContents>
                  </InputFlexContainer>
                </InputContainerContents>
              </FlexContainer>
              {!canView && (
                <ProfileButton>
                  <button>Update</button>
                </ProfileButton>
              )}
            </form>
          </BorderStyles>
        </ContainerStyles>
      </PageContainer>
    </>
  );
};

export default UserProfile;
