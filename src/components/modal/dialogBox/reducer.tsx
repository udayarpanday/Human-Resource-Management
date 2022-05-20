import {  createSlice } from "@reduxjs/toolkit";
import { ILeaveRequest } from "../../../interface/ILeaveRequest";

export interface IDeleteModalState {
  handleModal: boolean;
  inProgress: boolean;
  status: number;
  currentAction: string;
  deleteId: number;
  approveId:number;
  leaveRequestData:ILeaveRequest;
}
const UpdateLeaveDetails = {
  id: 0,
  Name: "",
  EmployeeId: "",
  LeaveType: "",
  LeaveFrom:new Date(),
  LeaveTo: new Date(),
  LeaveReason: "",
  Status:""
};

export const initialState: IDeleteModalState = {
  inProgress: false,
  status: 0,
  currentAction: "",
  handleModal: false,
  deleteId:0,
  approveId:0,
  leaveRequestData:UpdateLeaveDetails,
};

const deleteModalSlice = createSlice({
  name: "deleteModal",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // TODO : need to revist again.

    toggleDialogBox: (state, action) => {
      state.handleModal = action.payload;
    },
    deleteAction: (state, action) => {
      state.currentAction = action.payload.userAction;
      state.deleteId=action.payload.id;
    },
    approveAction: (state, action) => {
      state.currentAction = action.payload.userAction;
      state.approveId=action.payload.id;
      state.leaveRequestData=action.payload.records;
    },
  },
});

export const { toggleDialogBox,deleteAction,approveAction } = deleteModalSlice.actions;

export default deleteModalSlice.reducer;
