import React, { useEffect } from "react";
import {
  HoverContainer,
  HoverIcon,
  TableContents,
  TableImage,
} from "../../../components/tables/Table-styled";
import { CommonContainer } from "../../../styles/Container.styled";
import { MdOutlineDone, MdClear } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";

import { useAppDispatch } from "../../../app/hooks";
import { useAppSelector } from "../../../app/hooks";

import { leaveDetails } from "../selectors";
import {
  leaveDetailsAsync,
  toggleModal,
  updateLeaveRequestForm,
  userAction,
} from "../reducer";
import RequestLeaveModal from "../../../components/modal/leaveFormModal/requestLeaveModal";
import { formatDate } from "../../../utilities/tools";
import DialogBox from "../../../components/modal/dialogBox";
import {
  approveAction,
  toggleDialogBox,
} from "../../../components/modal/dialogBox/reducer";
import { viewOnly } from "../../../components/modal/addEventsModal/reducer";

const LeaveRequestTable = () => {
  const dispatch = useAppDispatch();
  const leaveRecords = useAppSelector(leaveDetails);

  const declineRequest = (contents: any) => {
    dispatch(toggleDialogBox(true));
    dispatch(
      approveAction({
        userAction: "declineRequest",
        id: contents.id,
        records: contents,
      })
    );
  };

  const approveRequest = (contents: any) => {
    dispatch(toggleDialogBox(true));
    dispatch(
      approveAction({
        userAction: "approveRequest",
        id: contents.id,
        records: contents,
      })
    );
  };
  const viewRecords = (id: number) => {
    dispatch(toggleModal(true));
    dispatch(viewOnly(true));
    dispatch(userAction("update"));
    dispatch(updateLeaveRequestForm({ leaveRecords: leaveRecords, id: id }));
  };

  return (
    <CommonContainer>
      <TableContents>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Employee ID</th>
              <th>Leave Type</th>
              <th>Date</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {useAppSelector(leaveDetails).map((contents: any) => {
              const {
                id,
                Image,
                Name,
                EmployeeId,
                LeaveType,
                LeaveReason,
                LeaveFrom,
                LeaveTo,
                Status,
              } = contents;
              if (Status && Status === "Pending") {
                return (
                  <tr key={id}>
                    <td>
                      <TableImage>
                        <img src={Image} alt="user" />
                        <div>
                          <span>{Name}</span>
                        </div>
                      </TableImage>
                    </td>
                    <td>{EmployeeId}</td>
                    <td>{LeaveType}</td>
                    <td>
                      {formatDate(LeaveFrom)}-{formatDate(LeaveTo)}
                    </td>
                    <td>{LeaveReason}</td>
                    <td>
                      <HoverContainer>
                        <HoverIcon color="#5BC76C">
                          <BsFillEyeFill onClick={() => viewRecords(id)} />
                        </HoverIcon>
                        <HoverIcon color="#0DA5E9">
                          <MdClear onClick={() => declineRequest(contents)} />
                          <RequestLeaveModal></RequestLeaveModal>
                          <DialogBox
                            header={"Click Yes to proceed"}
                          ></DialogBox>
                        </HoverIcon>
                        <HoverIcon color="#EE3524">
                          <MdOutlineDone
                            onClick={() => approveRequest(contents)}
                          />
                        </HoverIcon>
                      </HoverContainer>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </TableContents>
    </CommonContainer>
  );
};

export default LeaveRequestTable;
