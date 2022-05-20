import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  CalendarContainer,
  CommonContainer,
} from "../../styles/Container.styled";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { eventDetails } from "../modal/addEventsModal/selector";
import { toggleAddEvents, updateEvents, userAction } from "../modal/addEventsModal/reducer";
import userDetails from "../../utilities/localStorage";

const Calendar = () => {
  const eventData = useAppSelector(eventDetails);
  const dispatch = useAppDispatch();


  return (
    <CommonContainer>
      <CalendarContainer>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next,today",
            center: "title",
            right: "prevYear,nextYear",
          }}
          timeZone= 'local'
          displayEventTime={false}
          events={eventData}
          eventDidMount={function(info) {
            console.log(info.event.extendedProps.description);}
          }
          eventClick= {function(info) {
            if(userDetails.Role==="Admin"){
              dispatch(userAction("Update"))
              dispatch(updateEvents({
                start:info.event.start,
                end:info.event.end,
                title:info.event.title,
                description:info.event.extendedProps.description,
                id:info.event.id
              }))
              dispatch(toggleAddEvents(true));
            }
          }}
          
          expandRows={true}
          handleWindowResize={true}
          views={{
            dayGrid: {
              titleFormat: { year: "numeric", month: "short", day: "numeric" },
            },
          }}
          contentHeight={500}
        />
      </CalendarContainer>
    </CommonContainer>
  );
};

export default Calendar;
