import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SecondaryButton } from "../../components/buttons/Buttons.styled";
import DashboardChart from "../../components/charts/DashboardChart";
import RequestLeaveModal from "../../components/modal/leaveFormModal/requestLeaveModal";
import { CommonContainer } from "../../styles/Container.styled";
import { SectionHeader } from "../../styles/sectionTitle.styled";
import {  toggleModal } from "../leaves/reducer";
import { LeaveSummaryContents } from "./Dashboard.styled";



const LeaveSummary = () => {
  const dispatch = useAppDispatch();
  const openModal = () => {
    dispatch(toggleModal(true));
  };

  return (
<>
    
    <CommonContainer>
      <SectionHeader>
        <h5>Leave Summary</h5>
        <SecondaryButton>
          <button onClick={openModal}>Request Leave</button>
        <RequestLeaveModal></RequestLeaveModal>
        </SecondaryButton>
      </SectionHeader>
      <LeaveSummaryContents>
        <DashboardChart />
      </LeaveSummaryContents>
    </CommonContainer>
    </>
  );
  
};

export default LeaveSummary;
