import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  ModalButton,
  ModalButtonContainer,
  ModalContainer,
} from "../../buttons/Buttons.styled";
import {
  DeleteModalHeader,
} from "../../../styles/sectionTitle.styled";
import { IoCloseCircle } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { approveId, currentAction, deleteId, handleModal, leaveRequestData } from "./selector";
import { toggleDialogBox } from "./reducer";
import { deleteProjectAsync, projectDetailsAsync } from "../../../pages/projects/reducer";
import { deleteLeaveRecordsAsync, leaveDetailsAsync, updateLeaveRequestFormAsync } from "../../../pages/leaves/reducer";

import { useHistory } from "react-router-dom";
import { deleteEmployeeAsync, profileDetailsAsync } from "../../../pages/profile/reducer";

interface IDialogBoxState {
  header: String
}

const DialogBox = (props: any) => {
  let history = useHistory();
  const dispatch = useAppDispatch();
  const open = useAppSelector(handleModal);
  const userAction = useAppSelector(currentAction);
  const deleteUser = useAppSelector(deleteId);
  const approveUser = useAppSelector(approveId);
  const userLeaveDetails = useAppSelector(leaveRequestData);
  const handleOpen = () => dispatch(toggleDialogBox(true));
  const handleClose = () => dispatch(toggleDialogBox(false));

  const deleteRecord = () => {
    if (userAction === "project") {
      dispatch(deleteProjectAsync({ id: deleteUser })).then(() => {
        dispatch(projectDetailsAsync())

      });
      handleClose();
    } else if (userAction === "employees") {
      dispatch(deleteEmployeeAsync({ id: deleteUser })).then(() => {
        dispatch(profileDetailsAsync())
      });
      handleClose();
    } else if (userAction === "leaves") {
      dispatch(deleteLeaveRecordsAsync({ id: deleteUser })).then(() => {
        dispatch(leaveDetailsAsync())
      });
      handleClose();
    } else if (userAction === "approveRequest") {
      const leaveRequestData = {
        Name: userLeaveDetails.Name,
        EmployeeId: userLeaveDetails.EmployeeId,
        LeaveFrom: userLeaveDetails.LeaveFrom,
        LeaveTo: userLeaveDetails.LeaveTo,
        LeaveType: userLeaveDetails.LeaveType,
        LeaveReason: userLeaveDetails.LeaveReason,
        Status: "Approved"
      }
      dispatch(updateLeaveRequestFormAsync({ leaveRequest: leaveRequestData, id: approveUser })).then(() => {
        dispatch(leaveDetailsAsync())
      })
      handleClose();
    } else if (userAction === "declineRequest") {
      const leaveRequestData = {
        Name: userLeaveDetails.Name,
        EmployeeId: userLeaveDetails.EmployeeId,
        LeaveFrom: userLeaveDetails.LeaveFrom,
        LeaveTo: userLeaveDetails.LeaveTo,
        LeaveType: userLeaveDetails.LeaveType,
        LeaveReason: userLeaveDetails.LeaveReason,
        Status: "Declined"
      }
      dispatch(updateLeaveRequestFormAsync({ leaveRequest: leaveRequestData, id: approveUser })).then(() => {

        dispatch(leaveDetailsAsync())
      })
      handleClose();
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #fff",
            boxShadow: 24,
            width: 350,
          }}
        >
          <ModalContainer>
            <DeleteModalHeader>
              <h5>Are you sure?</h5>
              <p>{props.header}</p>
              <IoCloseCircle onClick={handleClose} />
            </DeleteModalHeader>
            <ModalButtonContainer>
              <ModalButton>
                <button onClick={handleClose}>No</button>
                <button onClick={deleteRecord}>Yes</button>
              </ModalButton>
            </ModalButtonContainer>
          </ModalContainer>
        </Box>
      </Modal>
    </div>
  );
};

export default DialogBox;
