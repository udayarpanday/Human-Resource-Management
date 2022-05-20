import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { SecondaryButton } from "../../buttons/Buttons.styled";
import { ModalHeader } from "../../../styles/sectionTitle.styled";
import LeaveForm from "./addEvents";
import { IoCloseCircle } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { currentAction, handleEvents } from "./selector";
import { toggleAddEvents, userAction } from "./reducer";

const AddEventsModal = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(handleEvents);
  const action = useAppSelector(currentAction);
  const handleOpen = () => {
    dispatch(userAction("Add"))
    dispatch(toggleAddEvents(true));
  };
  const handleClose = () => dispatch(toggleAddEvents(false));

  return (
    <div>
      <SecondaryButton>
        <button onClick={handleOpen}>Add Events</button>
      </SecondaryButton>
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
            width: "fit-content",
            bgcolor: "background.paper",
            border: "2px solid #fff",
            boxShadow: 24,
          }}
        >
          <ModalHeader>
            <h5>{action} Event</h5>
            <IoCloseCircle onClick={handleClose} />
          </ModalHeader>
          <LeaveForm />
        </Box>
      </Modal>
    </div>
  );
};

export default AddEventsModal;
