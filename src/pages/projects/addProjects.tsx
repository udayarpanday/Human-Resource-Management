import React, { useEffect, useState } from "react";
import { ProfileButton } from "../../components/buttons/Buttons.styled";
import {
  MultiSelectFieldStyles,
  MultiStyles,
  ProfileInputFieldStyles,
} from "../../components/inputFields/InputFields.styled";
import NavBar from "../../components/navBar";
import SideBar from "../../components/sideBar";
import {
  ContainerStyles,
  FlexContainer,
  InputFlexContainer,
  InputFlexContainerContents,
  PageContainer,
} from "../../styles/Container.styled";
import { SectionTitleStyles } from "../../styles/sectionTitle.styled";
import {
  BorderStyles,
  ImageHover,
  InputContainerContents,
} from "../profile/Profile-Style";
import UserImage from "../../images/UserImage.png";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import {
  addProjectAsync,
  createEmployee,
  deleteProjectAsync,
  projectDetailsAsync,
  projectUpdated,
  updateProjectAsync,
  userAction,
} from "./reducer";
import { currentAction, projectDetail, projectDetails } from "./selector";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { viewDetails } from "../../components/modal/addEventsModal/selector";

import "react-datepicker/dist/react-datepicker.css";
import { profileDetailsAsync } from "../profile/reducer";
import { profileDetails } from "../profile/selector";
import { IProjectTeams } from "../../interface/IProject";
import Multiselect from "multiselect-react-dropdown";
import { IMultiSelectOptions } from "../../interface/IProfileRequest";

interface IProjectBody {
  sideBar: boolean;
}

type IProjectSubmitForm = {
  projectName: string;
  startDate: Date;
  endDate: Date;
  teamMember: IProjectTeams[];
  teamLead: string;
};

const AddProjects = (props: IProjectBody) => {
  let history = useHistory();
  const dispatch = useAppDispatch();
  const project = useAppSelector(projectDetails);
  const updateDetails = useAppSelector(projectDetail);
  const userDetails = useAppSelector(profileDetails);
  const canView = useAppSelector(viewDetails);
  const action = useAppSelector(currentAction);

  const schema = yup.object().shape({
    startDate: yup
      .date()
      .default(() => new Date())
      .required("Please enter the project start date.")
      .typeError("Invalid Date"),

    endDate: yup
      .date()
      .default(() => new Date())
      .min(yup.ref("startDate"), "End date can't be before start date")
      .required("Please enter the project start date.")
      .typeError("Invalid Date"),
    projectName: yup.string().required("Please enter your Project Name"),
    teamLead: yup.string().required("Please select your team lead."),
    teamMember: yup.array().required("Please select your team members."),
  });

  const [file, setFile] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IProjectSubmitForm>({
    resolver: yupResolver(schema),
  });

  const location = useLocation();

  const projectId = useParams();

  const [textValues, setDefaultValue] = useState<IProjectSubmitForm>({
    projectName: "",
    startDate: new Date(),
    endDate: new Date(),
    teamMember: [
      {
        Name: "",
        Image: "",
        id: 0,
      },
    ],
    teamLead: "",
  });
  const [isSetValue, updateFlag] = useState(true);

  useEffect(() => {
    dispatch(projectDetailsAsync());
    dispatch(profileDetailsAsync());
    if (location.pathname.toLowerCase().includes("editprojects")) {
      Object.values(projectId).forEach((element) => {
        dispatch(projectUpdated({ id: Number(element), project: project }));
      });
    } else if (location.pathname.toLowerCase().includes("addprojects")) {
      dispatch(userAction("Add"));
      dispatch(createEmployee());
    }
  }, [location]);

  const submitForm = (data: IProjectSubmitForm) => {
    const projectData = {
      Image: "../images/UserImage.png",
      ProjectName: data.projectName,
      StartDate: data.startDate,
      EndDate: data.endDate,
      TeamMember: textValues.teamMember,
      TeamLead: data.teamLead,
    };

    if (action === "Add") {
      dispatch(addProjectAsync({ addProject: projectData })).then(() => {
        reset();
        history.push("/projects");
      });
      // console.log("afterDispatch")
    } else if (action === "Update") {
      Object.values(projectId).forEach((element) => {
        dispatch(
          updateProjectAsync({ addProject: projectData, id: Number(element) })
        ).then(() => {
          reset();
          history.push("/projects");
        });
      });
      // reset();
      // history.push("/projects");
    }
  };

  useEffect(() => {
    register("endDate");
    register("startDate");
    register("projectName");
    register("teamLead");
    register("teamMember");
    updateFlag(false);
  }, [register]);

  const handleChange = (e: any) => {
    if (e) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  useEffect(() => {
    if (action !== "" && project && !isSetValue) {
      updateFlag(true);
      console.log(updateDetails);
      setDefaultValue({
        endDate: new Date(updateDetails.EndDate),
        startDate: new Date(updateDetails.StartDate),
        projectName: updateDetails.ProjectName,
        teamLead: updateDetails.TeamLead,
        teamMember: updateDetails.TeamMember,
      });
      updateProjectDetails();
    }
  }, [project, action, updateDetails, isSetValue, setValue]);

  const updateProjectDetails = () => {
    setValue("projectName", updateDetails.ProjectName);
    setValue("teamMember", updateDetails.TeamMember);
    setValue("teamLead", updateDetails.TeamLead);
    setValue("startDate", new Date(updateDetails.StartDate));
    setValue("endDate", new Date(updateDetails.EndDate));
  };

  var options: IMultiSelectOptions[] = [];

  userDetails.forEach((user) => {
    options.push({ name: user.FirstName, image: user.Image, id: user.id });
  });

  return (
    <>
      <NavBar />
      <PageContainer>
        <SideBar />
        <ContainerStyles sideBarWidth={props.sideBar}>
          <SectionTitleStyles>
            <h4>{action} Projects</h4>
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
                        <label>Project Name</label>
                        <input
                          readOnly={canView}
                          type="text"
                          placeholder="Project Name"
                          {...register("projectName")}
                          onChange={(e) => {
                            setValue("projectName", e.currentTarget.value, {
                              shouldValidate: true,
                              shouldDirty: true,
                            });
                            setDefaultValue({
                              ...textValues,
                              projectName: e.currentTarget.value,
                            });
                          }}
                        ></input>
                        <p>{errors.projectName?.message}</p>
                      </ProfileInputFieldStyles>
                    </InputFlexContainerContents>
                    <InputFlexContainerContents>
                      <ProfileInputFieldStyles>
                        <label>Team Lead</label>
                        <input
                          readOnly={canView}
                          type="text"
                          placeholder="Team Lead"
                          {...register("teamLead")}
                          onChange={(e) => {
                            setValue("teamLead", e.currentTarget.value, {
                              shouldValidate: true,
                              shouldDirty: true,
                            });
                            setDefaultValue({
                              ...textValues,
                              teamLead: e.currentTarget.value,
                            });
                          }}
                        ></input>
                        <p>{errors.teamLead?.message}</p>
                      </ProfileInputFieldStyles>
                    </InputFlexContainerContents>
                    <InputFlexContainerContents>
                      <ProfileInputFieldStyles>
                        <label>Start Date</label>
                        <DatePicker
                          selected={textValues.startDate}
                          required
                          readOnly={canView}
                          {...register("startDate")}
                          onChange={(date: Date) => {
                            setValue("startDate", date, {
                              shouldValidate: true,
                              shouldDirty: true,
                            });
                            setDefaultValue({
                              ...textValues,
                              startDate: date,
                            });
                          }}
                        />
                        <p>{errors.startDate?.message}</p>
                      </ProfileInputFieldStyles>
                    </InputFlexContainerContents>

                    <InputFlexContainerContents>
                      <ProfileInputFieldStyles>
                        <label>End Date</label>
                        <DatePicker
                          selected={textValues.endDate}
                          required
                          readOnly={canView}
                          onChange={(date: Date) => {
                            setValue("endDate", date, {
                              shouldValidate: true,
                              shouldDirty: true,
                            });
                            setDefaultValue({
                              ...textValues,
                              endDate: date,
                            });
                          }}
                        />
                        <p>{errors.endDate?.message}</p>
                      </ProfileInputFieldStyles>
                    </InputFlexContainerContents>
                    <InputFlexContainerContents>
                      <MultiSelectFieldStyles>
                        <label>Team Members</label>
                        <MultiStyles>
                          <Multiselect
                            options={options}
                            displayValue="name"
                            loading={canView}
                            selectedValues={textValues?.teamMember}
                            onRemove={(event) => {
                              setDefaultValue({
                                ...textValues,
                                teamMember: event,
                              });
                            }}
                            onSelect={(event) => {
                              setDefaultValue({
                                ...textValues,
                                teamMember: event,
                              });
                            }}
                            {...register("teamMember")}
                            placeholder="Team Members"
                          ></Multiselect>
                        </MultiStyles>
                        {/* <p>{errors.teamMember?.message}</p> */}
                      </MultiSelectFieldStyles>
                    </InputFlexContainerContents>
                  </InputFlexContainer>
                </InputContainerContents>
              </FlexContainer>
              {!canView && (
                <ProfileButton>
                  <button> Update</button>
                </ProfileButton>
              )}
            </form>
          </BorderStyles>
        </ContainerStyles>
      </PageContainer>
    </>
  );
};

export default AddProjects;
