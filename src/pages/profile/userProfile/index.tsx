import React, { useEffect, useState } from "react";
import NavBar from "../../../components/navBar";

import {
  CommonContainer,
  ContainerStyles,
  FlexContainer,
  FlexContainerContents,
  PageContainer,
} from "../../../styles/Container.styled";
import { SectionTitleStyles } from "../../../styles/sectionTitle.styled";
import SideBar from "../../../components/sideBar";
import ProfileBody from "./profileHeader";
import ProfileLower from "./profileBody";
import { profileDetail } from "../selector";
import { IProfileRequest } from "../../../interface/IProfileRequest";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { profileDetailsAsync } from "../reducer";


interface ProfileBody {
  userData?:IProfileRequest;
  sideBar: boolean;
}

const MainProfile = (props: ProfileBody) => {
  const userData=useAppSelector(profileDetail)
  const dispatch=useAppDispatch()
  useEffect(() => {
    dispatch(profileDetailsAsync());
  }, []);
  return (
    <>
      <NavBar />
      <PageContainer>
        <SideBar />
        <ContainerStyles sideBarWidth={props.sideBar}>
          <SectionTitleStyles>
            <h4> Profile</h4>
          </SectionTitleStyles>
          <ProfileBody userDetails={userData} />
          <ProfileLower userDetails={userData}/>
        </ContainerStyles> 
      </PageContainer>
    </>
  );
};

export default MainProfile;
