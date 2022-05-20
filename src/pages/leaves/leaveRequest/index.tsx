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
import LeaveDetailsTable from "./leaveRequestTable";

import RequestLeaveModal from "../../../components/modal/leaveFormModal/requestLeaveModal";
import { SecondaryButton } from "../../../components/buttons/Buttons.styled";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { leaveDetailsAsync, toggleModal, userAction } from "../reducer";
import { leaveDetails } from "../selectors";
import { useEffect } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LeaveDetailsBody {
  sideBar: boolean;
}
const LeaveRequest = (props: LeaveDetailsBody) => {
  const dispatch = useAppDispatch();
  const leaveRecords = useAppSelector(leaveDetails);
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
              <h4>Leave Request</h4>
            </SectionTitleStyles>
            {/* <SecondaryButton>
              <button onClick={openModal}>Request Leave</button>
            <RequestLeaveModal ></RequestLeaveModal>
            </SecondaryButton> */}
          </TitleContainer>
          <DataDisplay>
            <DataDisplayContainer>
              <DataDisplayContents>
                <p>Requested Leaves</p>
                <h4>{leaveRecords.length}</h4>
              </DataDisplayContents>
            </DataDisplayContainer>
          </DataDisplay>
          <LeaveDetailsTable />
        </ContainerStyles>
      </PageContainer>
    </>
  );
};

export default LeaveRequest;
