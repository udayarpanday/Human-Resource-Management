import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ModalHeader } from "../../../styles/sectionTitle.styled";
import LeaveForm from "./leaveForm";
import { IoCloseCircle } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { handleModal } from "../../../pages/leaves/selectors";
import { toggleModal } from "../../../pages/leaves/reducer";

const RequestLeaveModal = (props: any) => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(handleModal);
  const handleOpen = () => dispatch(toggleModal(true));
  const handleClose = () => dispatch(toggleModal(false));

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
            width: "fit-content",
            bgcolor: "background.paper",
            border: "2px solid #fff",
            boxShadow: 24,
          }}
        >
          <ModalHeader>
            <h5>Request For Leave</h5>
            <IoCloseCircle onClick={handleClose} />
          </ModalHeader>
          <LeaveForm/>
        </Box>
      </Modal>
    </div>
  );
};

export default RequestLeaveModal;
