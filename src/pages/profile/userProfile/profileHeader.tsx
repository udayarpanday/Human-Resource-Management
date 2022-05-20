import React, { useState } from "react";
import { PageContainer } from "../../../styles/Container.styled";
import {
  FlexContainerContents,
  ProfileContainerContents,
} from "../../../styles/Container.styled";
import UserImage from "../../../images/UserImage.png";
import {
  ProfileDetailsContainer,
  ProfileHeader,
  ProfileHeaderContainer,
  ProfileIcons,
  ProfilePicture,
  ProfileSocial,
  UserHeader,
  UserProfileContainer,
} from "../Profile-Style";

import { SecondaryButton } from "../../../components/buttons/Buttons.styled";
import { FaEnvelope, FaSkype, FaGithub } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { IProfileRequest } from "../../../interface/IProfileRequest";
import userDetails from "../../../utilities/localStorage";

interface IProfileBody {
  userDetails: IProfileRequest;
}
interface IParamsID {
  id: string;
}

const ProfileBody = (props: IProfileBody) => {
  const userId:IParamsID = useParams();

  return (
    <UserProfileContainer>
      <ProfileHeaderContainer>
        <ProfileContainerContents>
          <ProfilePicture>
            <img src={UserImage} alt="User Image" />
          </ProfilePicture>
        </ProfileContainerContents>
        <ProfileContainerContents>
          <ProfileIcons>
            <ProfileHeader>
              <h4>
                {props.userDetails.FirstName} {props.userDetails.LastName} (
                {props.userDetails.EmployeeId})
              </h4>
              <h5>{props.userDetails.Designation}</h5>
            </ProfileHeader>
            <ProfileSocial>
              <ProfileDetailsContainer>
                <ProfileIcons>
                  <FaEnvelope />
                  <h5>{props.userDetails.EmailAddress}</h5>
                </ProfileIcons>
              </ProfileDetailsContainer>
              <ProfileDetailsContainer>
                <ProfileIcons>
                  <MdCall />
                  <h5>{props.userDetails.MobileNumber}</h5>
                </ProfileIcons>
              </ProfileDetailsContainer>
              <ProfileDetailsContainer>
                <ProfileIcons>
                  <FaSkype />
                  <h5>{props.userDetails.SkypeId}</h5>
                </ProfileIcons>
              </ProfileDetailsContainer>
              <ProfileDetailsContainer>
                <ProfileIcons>
                  <FaGithub />
                  <h5>{props.userDetails.GithubId}</h5>
                </ProfileIcons>
              </ProfileDetailsContainer>
            </ProfileSocial>
          </ProfileIcons>
        </ProfileContainerContents>

        <ProfileContainerContents>
          <UserHeader>
            <SecondaryButton>
              {Number(userId.id) === userDetails.id && (
                <Link to={`/edit-profile/${props.userDetails.id}`}>
                  <button>Edit Profile</button>
                </Link>
              )}
            </SecondaryButton>
          </UserHeader>
        </ProfileContainerContents>
      </ProfileHeaderContainer>
    </UserProfileContainer>
  );
};

export default ProfileBody;
