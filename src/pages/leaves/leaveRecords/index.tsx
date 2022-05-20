import NavBar from "../../../components/navBar";
import SideBar from "../../../components/sideBar";
import {
  ContainerStyles,
  DataDisplay,
  DataDisplayContainer,
  DataDisplayContents,
  PageContainer,
  TitleContainer,
} from "../../../styles/Container.styled";
import { SectionTitleStyles } from "../../../styles/sectionTitle.styled";
import LeaveDetailsTable from "./leaveDetailsTable";

import RequestLeaveModal from "../../../components/modal/leaveFormModal/requestLeaveModal";
import { SecondaryButton } from "../../../components/buttons/Buttons.styled";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {  leaveDetailsAsync, toggleModal, userAction } from "../reducer";
import { filterUserData } from "../selectors";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LeaveDetailsBody {
  sideBar: boolean;
}
const LeaveDetails = (props: LeaveDetailsBody) => {
  const dispatch = useAppDispatch();
  const userLeaveRecords = useAppSelector(filterUserData);
  useEffect(() => {
    dispatch(leaveDetailsAsync())
  }, [])
  const openModal = () => {
    dispatch(toggleModal(true));
    dispatch(userAction("add"))
  };

  return (
    <>
     <ToastContainer autoClose={2000} />
      <NavBar />
      <PageContainer>
        <SideBar />
        <ContainerStyles sideBarWidth={props.sideBar}>
          <TitleContainer>
            <SectionTitleStyles>
              <h4>Leave Records</h4>
            </SectionTitleStyles>
            <SecondaryButton>
              <button onClick={openModal}>Request Leave</button>
            <RequestLeaveModal ></RequestLeaveModal>
            </SecondaryButton>
          </TitleContainer>
          <DataDisplay>
            <DataDisplayContainer>
              <DataDisplayContents>
                <p>Total Leaves</p>
                <h4>{userLeaveRecords.length}/18</h4>
              </DataDisplayContents>
            </DataDisplayContainer>
          </DataDisplay>
          <LeaveDetailsTable />
        </ContainerStyles>
      </PageContainer>
    </>
  );
};

export default LeaveDetails;
