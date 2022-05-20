import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import homeReducer from '../components/navBar/reducer'
import profileReducer from '../pages/profile/reducer'

import leaveReducer from '../pages/leaves/reducer'
import projectReducer from "../pages/projects/reducer";
import eventReducer from "../components/modal/addEventsModal/reducer"
import dialogReducer from "../components/modal/dialogBox/reducer"

export const store = configureStore({
    reducer: {
        homeStore: homeReducer,
        profileStore: profileReducer,
        leavesRecords: leaveReducer,
        projectStore:projectReducer,
        eventStore:eventReducer,
        dialogStore:dialogReducer,
    },
});



export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<

    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
