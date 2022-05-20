import styled, { css } from "styled-components";
import { device } from "./Breakpoints";

const hidden = css`
  width: calc(100% - 100px);
  transition: 0.6s all ease;
  @media ${device.laptop} {
    transition: 0.6s all ease;
    width: calc(100% - 250px);
  }
  @media ${device.tablet} {
    transition: 0.6s all ease;
    width: calc(100% - 0px);
  }
`;
const normal = css`
  width: calc(100% - 300px);
  transition: 0.6s all ease;
  @media ${device.laptop} {
    transition: 0.6s all ease;
    width: calc(100% - 0px);
  }
`;

export const ContainerStyles = styled.div<{ sideBarWidth: boolean }>`
  padding: 30px;
  ${({ sideBarWidth }) => (sideBarWidth ? hidden : normal)}
  height: 100%;
  margin-left: auto;
  margin-top: 60px;
  @media ${device.mobileL} {
    padding: 15px;
  }
`;

export const FlexContainer = styled.div`
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media ${device.laptop} {
    flex-direction: column;
  }
  @media ${device.mobileL} {
    padding: 15px 0;
  }
`;
export const FlexContainerContents = styled.div`
  width: 50%;
  padding-right: 30px;
  @media ${device.laptop} {
    width: 100%;
    padding-right: 0px;
    :last-of-type {
      padding-top: 30px;
    }
  }
`;
export const LeaveContainerContents = styled.div`
  width: 50%;
  @media ${device.laptop} {
    width: 100%;
    padding-top: 30px;
  }
`;

export const ProfileContainerContents = styled.div`
  width: 250px;
  :nth-of-type(2) {
    width: calc(100% - 250px);
    padding-left: 60px;
  }
  @media ${device.tablet} {
    width: 100%;
    padding: 0;
    :nth-of-type(2) {
      width: 100%;
      padding-left: 0;
    }
  }
`;

export const PageContainer = styled.div`
  display: flex;
`;
export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;
export const PageContents = styled.div`
  width: 65%;
  @media ${device.mobileL} {
    width: 100%;
  }
`;
export const CommonContainer = styled.div`
  box-shadow: 0px 5px 8px 2px #e5e5e5;
  border-radius: 3px;
`;
export const EventContainer = styled.div`
  box-shadow: 0px 5px 8px 2px #e5e5e5;
  height: 565px;
  border-radius: 3px;
`;

export const DataDisplay = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 30px 0;
`;
export const DataDisplayContainer = styled.div`
  width: 25%;
  :not(:last-of-type) {
    padding-right: 10px;
  }
  @media ${device.laptop} {
    width: 50%;
    padding-bottom: 10px;
    padding-right: 10px;
  }
`;

export const EmployeeDisplayUpper = styled.div`
  justify-content: flex-end;
  padding: 30px 0; ;
`;

export const EmployeeContainer = styled.div`
  padding-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  @media ${device.laptop} {
    padding-top: 0;
  }
`;
export const DataSelectorsContainer = styled.div`
  display: flex;
  input {
    margin-right: 20px;
  }
  input,
  select {
    width: 250px;
  }
  @media ${device.laptop} {
    width: 100%;
    flex-wrap: wrap;
    padding-top: 30px;
  }
`;
export const DataDisplayContents = styled.div`
  box-shadow: 0px 5px 8px 2px #e5e5e5;
  padding: 15px;
  p {
    padding-bottom: 5px;
    font-weight: 300;
  }
`;
export const InputFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-right: -20px;
`;

export const InputFlexContainerContents = styled.div`
  width: 50%;
  padding-right: 20px;
  @media ${device.laptop} {
    width: 100%;
  }
`;

export const TextAreaContainerContents = styled.div`
  width: 100%;

  @media ${device.laptop} {
    width: 100%;
  }
`;
export const CalendarContainer = styled.div`
  cursor: pointer;
  @media ${device.mobileL} {
    font-size: 10px;
  }
`;

export const ModalContainer = styled.div`
  padding: 20px 30px;
`;
export const ModalContainerContents = styled.div`
  width: 50%;
`;

export const TextAreaContents = styled.div`
  width: 100%;
`;
