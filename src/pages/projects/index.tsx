import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar";
import SideBar from "../../components/sideBar";

import {
  ContainerStyles,
  DataDisplay,
  DataDisplayContainer,
  DataDisplayContents,
  PageContainer,
  TitleContainer,
} from "../../styles/Container.styled";
import { SectionTitleStyles } from "../../styles/sectionTitle.styled";
import ProjectDetailsTable from "./projectDetailsTable";
import { SecondaryButton } from "../../components/buttons/Buttons.styled";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { projectDetailsAsync} from "./reducer";
import userDetails from "../../utilities/localStorage";
import { projectDetails } from "./selector";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProjectDetailsBody {
  sideBar: boolean;
}

const ProjectDetails = (props: ProjectDetailsBody) => {
  const dispatch = useAppDispatch();
  const projectRecords=useAppSelector(projectDetails)
  
  useEffect(() => {
    dispatch(projectDetailsAsync());
  
  }, []);

  return (
    <>
     <ToastContainer autoClose={2000} />
      <NavBar />
      <PageContainer>
        <SideBar />
        <ContainerStyles sideBarWidth={props.sideBar}>
          <TitleContainer>
            <SectionTitleStyles>
              <h4>Projects</h4>
            </SectionTitleStyles>
            {userDetails.Role === "Admin" && (
              <SecondaryButton>
                <Link to="/addprojects">
                  <button> Add Project</button>
                </Link>
                
              </SecondaryButton>
            )}
          </TitleContainer>
          <DataDisplay>
            <DataDisplayContainer>
              <DataDisplayContents>
                <p>Total Projects</p>
                <h4>{projectRecords.length}</h4>
              </DataDisplayContents>
            </DataDisplayContainer>
            <DataDisplayContainer>
              <DataDisplayContents>
                <p>On Going Projects</p>
                <h4>50</h4>
              </DataDisplayContents>
            </DataDisplayContainer>
            <DataDisplayContainer>
              <DataDisplayContents>
                <p>Completed Projects</p>
                <h4>50</h4>
              </DataDisplayContents>
            </DataDisplayContainer>
          </DataDisplay>
          <ProjectDetailsTable />
        </ContainerStyles>
      </PageContainer>
    </>
  );
};

export default ProjectDetails;
