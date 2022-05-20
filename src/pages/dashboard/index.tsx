import Calendar from "../../components/calendar/Calendar";
import NavBar from "../../components/navBar";
import SideBar from "../../components/sideBar";

import {
  ContainerStyles,
  FlexContainer,
  FlexContainerContents,
  LeaveContainerContents,
  PageContainer,
} from "../../styles/Container.styled";
import { SectionTitleStyles } from "../../styles/sectionTitle.styled";
import CalendarEvents from "./CalendarEvents";
import LeaveSummary from "./leaveSummary";
import OnLeave from "./onLeave";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




interface DashBoardBody {
  sideBar: boolean;
}

const Dashboard = (props: DashBoardBody) => {


  return (
    <>
    <ToastContainer autoClose={2000} />
      <NavBar />
      <PageContainer>
        <SideBar />
        <ContainerStyles sideBarWidth={props.sideBar}>
          <SectionTitleStyles>
            <h4>Dashboard</h4>
          </SectionTitleStyles>
          <FlexContainer>
            <FlexContainerContents>
              <LeaveSummary />
            </FlexContainerContents>
            <LeaveContainerContents>
              <OnLeave />
            </LeaveContainerContents>
          </FlexContainer>
            <SectionTitleStyles>
              <h4>Calendar</h4>
            </SectionTitleStyles>
          <FlexContainer>
            <FlexContainerContents>
              <Calendar />
            </FlexContainerContents>
            <LeaveContainerContents>
              <CalendarEvents />
            </LeaveContainerContents>
          </FlexContainer>
        </ContainerStyles>
      </PageContainer>
    </>
  );
};

export default Dashboard;
