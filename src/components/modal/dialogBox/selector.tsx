import { RootState } from "../../../app/store";

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const status = (state: RootState) => state.dialogStore.status;
export const currentAction = (state: RootState) => state.dialogStore.currentAction;
export const deleteId = (state: RootState) => state.dialogStore.deleteId;
export const approveId = (state: RootState) => state.dialogStore.approveId;
export const handleModal=(state:RootState)=>state.dialogStore.handleModal;
export const leaveRequestData=(state:RootState)=>state.dialogStore.leaveRequestData;