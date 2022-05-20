import { RootState } from "../../../app/store";

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const status = (state: RootState) => state.eventStore.status;
export const eventDetails = (state: RootState) => state.eventStore.eventDetails;
export const viewDetails = (state: RootState) => state.eventStore.viewDetails;
export const handleEvents = (state: RootState) => state.eventStore.handleEvents;
export const currentAction = (state: RootState) => state.eventStore.currentAction;
export const eventDetail = (state: RootState) => state.eventStore.eventDetail;
export const UpdateId = (state: RootState) => state.eventStore.UpdateId;