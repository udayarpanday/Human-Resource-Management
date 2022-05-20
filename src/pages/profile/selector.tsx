import { RootState } from "../../app/store";

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const status = (state: RootState) => state.profileStore.status;
export const profileDetails = (state: RootState) => state.profileStore.profileDetails;
export const profileDetail = (state: RootState) => state.profileStore.profileDetail;
export const filterUserData = (state: RootState) => state.profileStore.filterUserData;
export const updatePassword = (state: RootState) => state.profileStore.updatePassword;




