import React, { useEffect } from "react";
import {
  HoverContainer,
  HoverIcon,

  LeaveModule,

  TableContents,
} from "../../../components/tables/Table-styled";
import { CommonContainer } from "../../../styles/Container.styled";
import { MdModeEditOutline, MdDeleteForever } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";

import { useAppDispatch } from "../../../app/hooks";
import { useAppSelector } from "../../../app/hooks";

import { filterUserData, leaveDetails } from "../selectors";
import {
  filterRequestForm,
  leaveDetailsAsync,
  toggleModal,
  updateLeaveRequestForm,
  userAction,
} from "../reducer";
import RequestLeaveModal from "../../../components/modal/leaveFormModal/requestLeaveModal";
import { formatDate } from "../../../utilities/tools";
import userDetails from "../../../utilities/localStorage";
import DialogBox from "../../../components/modal/dialogBox";
import {
  deleteAction,
  toggleDialogBox,
} from "../../../components/modal/dialogBox/reducer";
import { viewOnly } from "../../../components/modal/addEventsModal/reducer";

const LeaveDetailsTable = () => {
  const dispatch = useAppDispatch();
  const leaveRecords = useAppSelector(leaveDetails);
  const userLeaveRecords = useAppSelector(filterUserData);

  useEffect(() => {
    dispatch(
      filterRequestForm({
        id: userDetails.EmployeeId,
        leaveDetails: leaveRecords,
      })
    );
  }, [leaveRecords]);

  const deleteRecords = (id: number) => {
    dispatch(toggleDialogBox(true));
    dispatch(deleteAction({ userAction: "leaves", id: id }));
  };

  const editRecords = (contents: any) => {
    dispatch(toggleModal(true));
    if (contents.Status === "Approved") {
      dispatch(viewOnly(true));
    } else {
      dispatch(viewOnly(false));
    }
    dispatch(userAction("update"));
    dispatch(
      updateLeaveRequestForm({
        leaveRecords: userLeaveRecords,
        id: contents.id,
      })
    );
  };
  const viewRecords = (id: number) => {
    dispatch(toggleModal(true));
    dispatch(viewOnly(true));
    dispatch(userAction("update"));
    dispatch(
      updateLeaveRequestForm({ leaveRecords: userLeaveRecords, id: id })
    );
  };

  const tableStyle = {
         maxWidth: "307px",
          overFlow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          display: "block", 
          // fontWeight: "bold",
  }

  return (
    <CommonContainer>
      <TableContents>
        <table>
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userLeaveRecords.map((contents: any) => {
              const { id, LeaveType, LeaveReason, LeaveFrom, LeaveTo, Status } =
                contents;
              return (
                <tr key={id}>
                  <td>{LeaveType}</td>
                  <td>
                    {formatDate(LeaveFrom)}-{formatDate(LeaveTo)}
                  </td >

                  <td >
                    {LeaveReason}
                  </td>

                  <td>{LeaveReason}</td>

                  <td>{Status}</td>
                  <td>
                    <HoverContainer>
                      <HoverIcon color="#5BC76C">
                        <BsFillEyeFill onClick={() => viewRecords(id)} />
                      </HoverIcon>
                      {Status === "Approved" ? (
                        <></>
                      ) : (
                        <>
                          <HoverIcon color="#0DA5E9">
                            <MdModeEditOutline
                              onClick={() => editRecords(contents)}
                            />
                            <RequestLeaveModal
                              data={contents}
                              id={contents.id}
                            ></RequestLeaveModal>
                          </HoverIcon>
                          <HoverIcon color="#EE3524">
                            <MdDeleteForever
                              onClick={() => deleteRecords(id)}
                            />
                            <DialogBox
                              header={" Click Yes to proceed"}
                            ></DialogBox>
                          </HoverIcon>
                        </>
                      )}
                    </HoverContainer>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableContents>
    </CommonContainer>
  );
};

export default LeaveDetailsTable;
