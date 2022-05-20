import { RootState } from "../../app/store";

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const status = (state: RootState) => state.leavesRecords.status;
export const leaveDetails = (state: RootState) => state.leavesRecords.leaveDetails;
export const leaveDetail = (state: RootState) => state.leavesRecords.leaveDetail;
export const handleModal = (state: RootState) => state.leavesRecords.handleModal;
export const currentAction = (state: RootState) => state.leavesRecords.currentAction;
export const updateLeavesId = (state: RootState) => state.leavesRecords.UpdateId;
export const filterUserData = (state: RootState) => state.leavesRecords.filterUserData;