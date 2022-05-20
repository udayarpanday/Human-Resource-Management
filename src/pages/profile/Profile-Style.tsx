import styled from "styled-components";
import { device } from "../../styles/Breakpoints";

export const InputContainerContents = styled.div`
  width: 245px;
  :first-of-type {
    padding-right: 45px;
  }
  :last-of-type {
    width: calc(100% - 245px);
    @media ${device.laptop} {
      width: 100%;
    }
  }
  @media ${device.laptop} {
    width: 100%;
    :first-of-type {
      display: flex;
      justify-content: center;
      padding-right: 0;
      padding-bottom: 30px;
    }
  }
`;
export const ImageHover = styled.div`
  position: relative;
  text-align: center;
  :hover {
    ::before {
      position: absolute;
      border-radius: 100px;
      background-color: #2827277a;
      z-index: 9;
      content: "Choose Image";
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  img {
    height: 200px;
    width: 200px;
    border-radius: 100px;
    object-fit: cover;
  }
  input {
    cursor: pointer;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 99;
  }
`;

export const BorderStyles = styled.div`
  box-shadow: 0px 5px 8px 2px #e5e5e5;
  margin-top: 30px;
  padding: 0 30px 30px;
`;
export const UserProfileContainer = styled.div`
  box-shadow: 0px 5px 8px 2px #e5e5e5;
  margin-top: 30px;
  padding: 20px;
`;

export const ProfileItem = styled.div`
  display: flex;
  align-items: center;
`;

export const UserProfile = styled.div`
  line-height: 24.5px;
  padding-bottom: 15px;
  P {
    font-size: 18px;
    color: #686868;
    margin-bottom: 10px;
  }
  h5 {
    margin-bottom: 10px;
  }
`;

export const ProfileBox = styled.div`
  margin-top: 15px;
`;

export const ProfileSection = styled.div`
  padding: 20px;
`;
export const ProfileHeaderContainer = styled.div`
  display: flex;
  @media ${device.tablet} {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
`;
export const ProfileHeader = styled.div`
  width: 100%;
  h5 {
    color: #686868;
    padding-top: 5px;
    font-weight: 400;
  }
  padding-bottom: 70px;
  @media ${device.tablet} {
    padding-bottom: 0px;
    padding: 20px 0px;
  }
`;
export const ProfileSocial = styled.div`
  p {
    color: #686868;
  }
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const ProfileIcons = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @media ${device.tablet} {
    justify-content: center;
  }
  margin-bottom: 10px;
  svg {
    width: 20px;
    height: 16px;
  }
  h5 {
    padding-left: 10px;
    color: #686868;
    font-weight: 400;
  }
`;
export const UserHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
  @media ${device.tablet} {
    justify-content: center;
  }
`;

export const ProfilePicture = styled.div`
  img {
    height: 200px;
    width: 200px;
    border-radius: 100%;
  }
  @media ${device.tablet} {
    img {
      height: 160px;
      width: 160px;
      border-radius: 100%;
    }
  }
`;

export const ProfileDetailsContainer = styled.div`
  width: 50%;
  @media ${device.tablet} {
    width: 100%;
  }
`;
export const ProfileDetailsTitle = styled.div`
  width: 300px;
  @media ${device.tablet} {
    width: 100%;
  }
`;
export const ProfileDetails = styled.div`
  width: 700px;
  @media ${device.tablet} {
    width: 100%;
  }
`;
