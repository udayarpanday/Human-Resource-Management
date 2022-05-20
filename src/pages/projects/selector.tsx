import { RootState } from "../../../src/app/store";

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const status = (state: RootState) => state.projectStore.status;
export const projectDetails = (state: RootState) => state.projectStore.projectDetails;
export const projectDetail=(state:RootState)=>state.projectStore.projectDetail;
export const handleModal=(state:RootState)=>state.projectStore.handleModal;
export const currentAction=(state:RootState)=>state.projectStore.currentAction;





