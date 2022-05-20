import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../helper";
import { ILeaveRequest } from "../../interface/ILeaveRequest";
import { toast } from "react-toastify";

export interface ILeaveRecords {
  inProgress: boolean;
  status: number;
  leaveDetails: ILeaveRequest[];
  leaveDetail: ILeaveRequest;
  currentAction: string;
  UpdateId: number;
  filterUserData: ILeaveRequest[];
  handleModal:boolean;
}

const LeaveDetailsData = [
  {
    id: 0,
    Name: "",
    EmployeeId: "",
    LeaveType: "",
    LeaveFrom: new Date(),
    LeaveTo: new Date(),
    LeaveReason: "",
    Status:""
    
  },
];

const UpdateLeaveDetails = {
  id: 0,
  Name: "",
  EmployeeId: "",
  LeaveType: "",
  LeaveFrom: new Date(),
  LeaveTo: new Date(),
  LeaveReason: "",
  Status:""
};


export const initialState: ILeaveRecords = {
  inProgress: false,
  status: 0,
  leaveDetails: LeaveDetailsData,
  leaveDetail: UpdateLeaveDetails,
  handleModal: false,
  currentAction: "",
  UpdateId: 0,
  filterUserData: LeaveDetailsData,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const leaveDetailsAsync = createAsyncThunk(
  "leave-details-async",
  async () => {
    try {
      const leaveDetailsResponse = await API.get(
        ` http://localhost:8000/leaveRecords`
      );
      return leaveDetailsResponse.data;
    } catch (errors) {
      console.log(`No Data Found >>> ${errors}`);
    }
  }
);
export const leaveRequestFormAsync = createAsyncThunk(
  "leave-request-async",
  async ({ leaveRequest }: { leaveRequest: ILeaveRequest }) => {
    try {
      const leaveRequestForm = await API.post(
        ` http://localhost:8000/leaveRecords`,
        leaveRequest
      );
      return leaveRequestForm.status;
    } catch (errors) {
      console.log(`No Data Found >>> ${errors}`);
    }
  }
);
export const updateLeaveRequestFormAsync = createAsyncThunk(
  "update-request-async",
  async ({ leaveRequest, id }: { leaveRequest: ILeaveRequest; id: number }) => {
    try {
      console.log(id);
      const leaveRequestForm = await API.put(
        ` http://localhost:8000/leaveRecords/${id}`,
        leaveRequest
      );
      return leaveRequestForm.status;
    } catch (errors) {
      console.log(`No Data Found >>> ${errors}`);
    }
  }
);
export const deleteLeaveRecordsAsync = createAsyncThunk(
  "delete-leave-records-async",
  async ({ id }: { id: number }) => {
    try {
      const deleteLeaveRecords = await API.delete(
        ` http://localhost:8000/leaveRecords/${id}`
      );
      return deleteLeaveRecords.data;
    } catch (errors) {
      console.log(`No Data Found >>> ${errors}`);
    }
  }
);

const leaveDetailSlice = createSlice({
  name: "leaveDetails",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // TODO : need to revisit again.
    createLeaveRequestForm: (state) => {
      state.leaveDetail = UpdateLeaveDetails;
    },
    updateLeaveRequestForm: (state, action) => {
      const { id, leaveRecords } = action.payload;
      state.UpdateId = id;
      const updatedLeaveForm = leaveRecords.find(findUserId);
      function findUserId(item: any) {
        return item.id === id;
      }
      if (updatedLeaveForm) {
        state.leaveDetail = updatedLeaveForm;
      }
    },
    toggleModal: (state, action) => {
      state.handleModal = action.payload;
    },
    userAction: (state, action) => {
      state.currentAction = action.payload;
    },
    filterRequestForm: (state, action) => {
      const { id, leaveDetails } = action.payload;
      var userLeaveRecords: ILeaveRequest[] = [];
      leaveDetails.map((user: any) => {
        if (user.EmployeeId === id) {
          userLeaveRecords.push(user);
        }
      });
      state.filterUserData = userLeaveRecords;
    },
  },

  
  extraReducers: (builder) => {
    builder
      .addCase(leaveDetailsAsync.pending, (state) => {
        state.inProgress = true;
      })
      .addCase(leaveDetailsAsync.fulfilled, (state, action: any) => {
        state.inProgress = false;
        console.log("Get Leave Details >>> ", action);
        if (action.payload) {
          state.leaveDetails = action.payload;
        }
      })
      .addCase(leaveRequestFormAsync.pending, (state) => {
        state.inProgress = true;
      })
      .addCase(leaveRequestFormAsync.fulfilled, (state, action) => {
        state.inProgress = false;

        if (action.payload) {
          toast.success("Request Sent Successfully");
        }
        
        console.log("Leave Request Form Submitted");
      })

      .addCase(updateLeaveRequestFormAsync.fulfilled, (state) => {
        state.inProgress = false;
        toast.info("Request updated successfully");

        console.log("Leave Request Form Submitted");
      })


      .addCase(deleteLeaveRecordsAsync.pending, (state) => {
        state.inProgress = true;
        toast.error("Request deleted");

      })
      .addCase(deleteLeaveRecordsAsync.fulfilled, (state, action: any) => {
        state.inProgress = false;
        console.log("Leave Record Deleted >>> ", action);
      });
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
});
export const {
  createLeaveRequestForm,
  toggleModal,
  userAction,
  updateLeaveRequestForm,
  filterRequestForm,
} = leaveDetailSlice.actions;
export default leaveDetailSlice.reducer;
