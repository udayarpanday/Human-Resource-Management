import React, { useEffect } from "react";
import {
  TableContents,
  TableEvent,
} from "../../components/tables/Table-styled";
import { SectionHeader } from "../../styles/sectionTitle.styled";
import {  EventContainer } from "../../styles/Container.styled";
import AddEventsModal from "../../components/modal/addEventsModal/addEventsModal";
import  userDetails  from "../../utilities/localStorage";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { eventDetails } from "../../components/modal/addEventsModal/selector";
import { eventDetailsAsync } from "../../components/modal/addEventsModal/reducer";
import { formatDate } from "../../utilities/tools";

const CalendarEvents = () => {
  const dispatch=useAppDispatch()
  useEffect(() => {
    dispatch(eventDetailsAsync())
  }, [])
  
  console.log(useAppSelector(eventDetails))
  return (
    <>
      <EventContainer>
        <SectionHeader>
          <h5>Upcoming Events</h5>
          {userDetails.Role === "Admin" ? <AddEventsModal />:(<></>)}
        </SectionHeader>
        <TableContents>
          <TableEvent>
            <table>
              <tbody>
                {useAppSelector(eventDetails).map((data) => {
                  const { end,start,title } = data;
                  return (
                    <tr>
                      <td>{title}</td>
                      <td>{formatDate(start)}-{formatDate(end)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TableEvent>
        </TableContents>
      </EventContainer>
    </>
  );
};

export default CalendarEvents;

