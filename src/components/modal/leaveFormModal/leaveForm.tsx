import React, { useEffect, useState } from "react";
import {
  InputFlexContainerContents,
  ModalContainer,
  ModalContainerContents,
  TitleContainer,
} from "../../../styles/Container.styled";

import {
  DateInputFieldStyles,
  ModalInputFieldStyles,
  ModalTextAreaStyles,
  ProfileInputFieldStyles,
} from "../../inputFields/InputFields.styled";
import { ReasonButton } from "../../buttons/Buttons.styled";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  leaveDetailsAsync,
  leaveRequestFormAsync,
  toggleModal,
  updateLeaveRequestFormAsync,
} from "../../../pages/leaves/reducer";
import userDetails from "../../../utilities/localStorage";
import {
  currentAction,
  leaveDetail,
  leaveDetails,
  updateLeavesId,
} from "../../../pages/leaves/selectors";
import { viewDetails } from "../addEventsModal/selector";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type UserSubmitForm = {
  leaveFrom: Date;
  leaveTo: Date;
  leaveReason: string;
  leaveType: string;
};

const LeaveForm = () => {
  const dispatch = useAppDispatch();
  const action = useAppSelector(currentAction);
  const leaveData = useAppSelector(leaveDetails);
  const updateLeaveDetails = useAppSelector(leaveDetail);
  const canView = useAppSelector(viewDetails);
  const updateRecord = useAppSelector(updateLeavesId);

  const [textValues, setDefaultValue] = useState({
    leaveFrom: new Date(),
    leaveTo: new Date(),
    leaveReason: "",
    leaveType: "",
  });

  const [isSetValue, updateFlag] = useState(true);

  const schema = yup.object().shape({
    leaveFrom: yup
      .date()
      .default(() => new Date())
      .required("Please select the date when you will be taking leave from.")
      .typeError("Invalid Date"),
    leaveTo: yup
      .date()
      .default(() => new Date())
      .min(yup.ref("leaveFrom"), "End date can't be before start date")
      .required("Please select the date when you will be taking leave to.")
      .typeError("Invalid Date"),
    leaveReason: yup.string().required("Please state your reason of leave"),
    leaveType: yup.string().required("Please enter your leave type."),
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
      leaveFrom: new Date(textValues.leaveFrom),
      leaveTo: new Date(textValues.leaveTo),
      leaveType: textValues.leaveType,
      leaveReason: textValues.leaveReason,
    },
  });

  const submitForm = (data: UserSubmitForm) => {
    const leaveRequestData = {
      Image: "../images/UserImage.png",
      Name: userDetails.FirstName + " " + userDetails.LastName,
      EmployeeId: userDetails.EmployeeId,
      LeaveFrom: data.leaveFrom,
      LeaveTo: data.leaveTo,
      LeaveType: data.leaveType,
      LeaveReason: data.leaveReason,
      Status: "Pending",
    };

    if (action === "update") {
      reset();
      dispatch(
        updateLeaveRequestFormAsync({
          leaveRequest: leaveRequestData,
          id: updateRecord,
        })
      ).then(() => {
        dispatch(leaveDetailsAsync());
      });
    } else if (action === "add") {
      reset();
      dispatch(leaveRequestFormAsync({ leaveRequest: leaveRequestData })).then(
        () => {
          dispatch(leaveDetailsAsync());
        }
      );
    }
    dispatch(toggleModal(false));
  };

  useEffect(() => {
    register("leaveFrom");
    register("leaveReason");
    register("leaveTo");
    register("leaveType");
    updateFlag(false);
  }, [register]);

  if (action === "update" && !isSetValue) {
    updateFlag(true);
    setDefaultValue({
      leaveFrom: new Date(updateLeaveDetails.LeaveFrom),
      leaveTo: new Date(updateLeaveDetails.LeaveTo),
      leaveType: updateLeaveDetails.LeaveType,
      leaveReason: updateLeaveDetails.LeaveReason,
    });
    setValue("leaveFrom", new Date(updateLeaveDetails.LeaveFrom));
    setValue("leaveTo", new Date(updateLeaveDetails.LeaveTo));
    setValue("leaveReason", updateLeaveDetails.LeaveReason);
    setValue("leaveType", updateLeaveDetails.LeaveType);
  }

  return (
    <>
      <ModalContainer>
        <form onSubmit={handleSubmit(submitForm)}>
          <TitleContainer>
            <ModalContainerContents>
              <DateInputFieldStyles>
                <div>
                  <label>Leave From</label>
                </div>
                <div>
                  <DatePicker
                    selected={textValues.leaveFrom}
                    required
                    readOnly={canView}
                    {...register("leaveFrom")}
                    onChange={(data: Date) => {
                      setValue("leaveFrom", data, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                      setDefaultValue({
                        ...textValues,
                        leaveFrom: data,
                      });
                    }}
                  />
                  <p>{errors.leaveFrom?.message}</p>
                </div>
              </DateInputFieldStyles>
            </ModalContainerContents>

            <ModalContainerContents>
              <DateInputFieldStyles>
                <div>
                  <label>Leave To</label>
                </div>
                <div>
                  <DatePicker
                    selected={textValues.leaveTo}
                    required
                    readOnly={canView}
                    {...register("leaveTo")}
                    onChange={(data: Date) => {
                      setValue("leaveTo", data, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                      setDefaultValue({
                        ...textValues,
                        leaveTo: data,
                      });
                    }}
                  />
                  <p>{errors.leaveTo?.message}</p>
                </div>
              </DateInputFieldStyles>
            </ModalContainerContents>
          </TitleContainer>
          <ModalContainerContents>
            <ModalInputFieldStyles>
              <div>
                <label>Leave Type</label>
              </div>
              <div>
                <select
                  {...register("leaveType")}
                  id="leaveTypes"
                  disabled={canView}
                  onChange={(e) => {
                    setValue("leaveType", e.target.value);
                    setDefaultValue({
                      ...textValues,
                      leaveType: e.target.value,
                    });
                  }}
                >
                  <option value="">Leave Type</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Normal Leave">Normal Leave</option>
                </select>

                <p>{errors.leaveType?.message}</p>
              </div>
            </ModalInputFieldStyles>
          </ModalContainerContents>
          <ModalTextAreaStyles>
            <div>
              <label>Reason for leave</label>
            </div>
            <div>
              <textarea
                placeholder="Reason for leave"
                {...register("leaveReason")}
                readOnly={canView}
                onChange={(e) => {
                  console.log(e.target.value);
                  setValue("leaveReason", e.target.value);
                  setDefaultValue({
                    ...textValues,
                    leaveReason: e.target.value,
                  });
                }}
              ></textarea>
              <p>{errors.leaveReason?.message}</p>
            </div>
          </ModalTextAreaStyles>
          {!canView && (
            <ReasonButton>
              <button type="submit">Submit</button>
            </ReasonButton>
          )}
        </form>
      </ModalContainer>
    </>
  );
};

export default LeaveForm;
