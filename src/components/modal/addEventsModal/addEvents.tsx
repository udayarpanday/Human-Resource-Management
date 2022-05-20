import React, { useEffect, useState } from "react";
import {
  ModalContainer,
  ModalContainerContents,
  TitleContainer,
} from "../../../styles/Container.styled";

import {
  DateInputFieldStyles,
  ModalInputFieldStyles,
} from "../../inputFields/InputFields.styled";
import { ReasonButton } from "../../buttons/Buttons.styled";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addEventsFormAsync, toggleAddEvents, updateEventsFormAsync } from "./reducer";
import { currentAction, eventDetail, UpdateId } from "./selector";
import { formatDate } from "../../../utilities/tools";
import { useHistory } from "react-router-dom";
import {eventDetailsAsync} from "./reducer"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


type UserSubmitForm = {
  eventFrom: Date;
  eventTo: Date;
  eventName: string;
  eventType?: string;
};

const AddEvents = () => {
  const dispatch = useAppDispatch();
  const action = useAppSelector(currentAction);
  const updateEventDetails = useAppSelector(eventDetail);
  const UpdateEvent = useAppSelector(UpdateId);
  
  const [textValues, setDefaultValue] = useState<UserSubmitForm>({
    eventFrom: new Date(),
    eventTo: new Date(),
    eventName: "",
    eventType: "",
  });
  const [isSetValue, updateFlag] = useState(true);

  const schema = yup.object().shape({
    eventFrom: yup
      .date()
      .default(() => new Date())
      .required("Please enter the date of the event.")
      .typeError("Invalid Date"),
    eventTo: yup
      .date()
      .default(() => new Date())
      .min(yup.ref("eventFrom"), "End date can't be before start date")
      .required("Please enter the date of the event.")
      .typeError("Invalid Date"),
    eventName: yup.string().required("Please enter the name of the event"),
    eventType: yup.string().required("Please enter the event type"),
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      eventFrom: new Date(textValues.eventFrom),
      eventTo: new Date(textValues.eventTo),
      eventName: textValues.eventName,
      eventType: textValues.eventType,
    },
  });
  const submitForm = (data: UserSubmitForm) => {
    const eventsData = {
      start: data.eventFrom,
      end: data.eventTo,
      title: data.eventName,
      description: data.eventType,
    };
    if (action === "Update") {
      reset();
      dispatch(
        updateEventsFormAsync({
          updateEvents: eventsData,
          id: UpdateEvent,
        })
      );
    } else if (action === "Add") {
      dispatch(addEventsFormAsync({ addEvents: eventsData }));
      reset();
    }
    dispatch(eventDetailsAsync());
    dispatch(toggleAddEvents(false));
    reset();
  };
  useEffect(() => {
    register("eventFrom");
    register("eventTo");
    register("eventName");
    register("eventType");
    updateFlag(false);
  }, [register]);

  if (action === "Update" && !isSetValue) {
    updateFlag(true);
    console.log(updateEventDetails)
    setDefaultValue({
      eventFrom: new Date(updateEventDetails.start),
      eventTo: new Date(updateEventDetails.end),
      eventName: updateEventDetails.title,
      eventType: updateEventDetails.description,
    });
    setValue("eventFrom", new Date(updateEventDetails.start));
    setValue("eventTo", new Date(updateEventDetails.end));
    setValue("eventName", updateEventDetails.title);
    setValue("eventType", updateEventDetails.description);
  }
     ;
      
  return (
    <>
     
      <ModalContainer>
        <form onSubmit={handleSubmit(submitForm)}>
          <TitleContainer>
            <ModalContainerContents>
              <DateInputFieldStyles>
                <div>
                  <label>Event From</label>
                </div>
                <div>
                <DatePicker
                    selected={textValues.eventFrom}
                    required
                    // readOnly={canView}
                    {...register("eventFrom")}
                    onChange={(data: Date) => {
                      setValue("eventFrom", data, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                      setDefaultValue({
                        ...textValues,
                        eventFrom: data,
                      });
                    }}
                  />
                  <p>{errors.eventFrom?.message}</p>
                </div>
              </DateInputFieldStyles>
            </ModalContainerContents>
            <ModalContainerContents>
              <DateInputFieldStyles>
                <div>
                  <label>Event To</label>
                </div>
                <div>
                <DatePicker
                    selected={textValues.eventTo}
                    required
                    // readOnly={canView}
                    {...register("eventTo")}
                    onChange={(data: Date) => {
                      setValue("eventTo", data, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                      setDefaultValue({
                        ...textValues,
                        eventTo: data,
                      });
                    }}
                  />
                  <p>{errors.eventTo?.message}</p>
                </div>
              </DateInputFieldStyles>
            </ModalContainerContents>
          </TitleContainer>
          <TitleContainer>
            <ModalContainerContents>
              <ModalInputFieldStyles>
                <div>
                  <label>Event Name</label>
                </div>
                <div>
                  <input
                    type="text"
                    {...register("eventName")}
                    placeholder="Event Name"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setValue("eventName", e.target.value);
                      setDefaultValue({
                        ...textValues,
                        eventName: e.target.value,
                      });
                    }}
                  ></input>
                  <p>{errors.eventName?.message}</p>
                </div>
              </ModalInputFieldStyles>
            </ModalContainerContents>
            <ModalContainerContents>
              <ModalInputFieldStyles>
                <div>
                  <label>Event Type</label>
                </div>
                <div>
                <input
                    type="text"
                    {...register("eventType")}
                    placeholder="Event Type"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setValue("eventType", e.target.value);
                      setDefaultValue({
                        ...textValues,
                        eventType: e.target.value,
                      });
                    }}
                  ></input>
                  <p>{errors.eventType?.message}</p>
                </div>
              </ModalInputFieldStyles>
            </ModalContainerContents>
          </TitleContainer>
          <ReasonButton>
            <button>Submit</button>
          </ReasonButton>
        </form>
      </ModalContainer>
    </>
  );
};

export default AddEvents;



