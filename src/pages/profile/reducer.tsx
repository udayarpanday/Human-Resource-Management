import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../helper";
import { IProfileRequest } from "../../interface/IProfileRequest";
import { toast } from "react-toastify";

export interface IProfileState {
  inProgress: boolean;
  status: number;
  profileDetails: IProfileRequest[];
  currentAction: string;
  profileDetail: IProfileRequest;
  filterUserData: IProfileRequest[];
  updatePassword: number;
}

const ProfileDetailsData = [
  {
    id: 0,
    EmployeeId: "",
    FirstName: "",
    LastName: "",
    EmailAddress: "",
    MobileNumber: 0,
    DOB: new Date(),
    JoinedDate: new Date(),
    Supervisor: "",
    Department: "",
    Role: "",
    PermanentAddress: "",
    TemporaryAddress: "",
    Password: "",
    SkypeId: "",
    Designation: "",
    GithubId: "",
  },
];

const ProfileDetail = {
  id: 0,
  EmployeeId: "",
  FirstName: "",
  LastName: "",
  EmailAddress: "",
  MobileNumber: 0,
  DOB: new Date(),
  JoinedDate: new Date(),
  Supervisor: "",
  Department: "",
  Role: "",
  PermanentAddress: "",
  TemporaryAddress: "",
  Password: "",
  SkypeId: "",
  Designation: "",
  GithubId: "",
};

export const initialState: IProfileState = {
  inProgress: false,
  status: 0,
  currentAction: "",
  profileDetails: ProfileDetailsData,
  profileDetail: ProfileDetail,
  filterUserData: ProfileDetailsData,
  updatePassword: 0,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

//TODO
//Create action to disptach empty project state
//Update action to disptach set project state from list of project state by id

export const profileDetailsAsync = createAsyncThunk(
  "profile-details-async",
  async () => {
    try {
      const personDetailsResponse = await API.get(
        `http://localhost:8000/person`
      );
      console.log(personDetailsResponse.data);
      return personDetailsResponse.data;
    } catch (errors) {
      console.log(`No Data Found >>> ${errors}`);
    }
  }
);

export const UpdatePasswordDetailsAsync = createAsyncThunk(
  "update--password-details-async",
  async ({ password, id }: { password: string; id: number }) => {
    try {
      const personDetailsResponse = await API.patch(
        `http://localhost:8000/person/${id}`,
        { Password: password }
      );
      console.log(personDetailsResponse.data, "personDetails");
      return personDetailsResponse.data;
    } catch (errors) {
      console.log(`No Data Found >>> ${errors}`);
    }
  }
);

export const addEmployeesAsync = createAsyncThunk(
  "profile-request-async",
  async ({ addEmployees }: { addEmployees: IProfileRequest }) => {
    try {
      const profileRequestForm = await API.post(
        `http://localhost:8000/person`,
        addEmployees
      );
      return profileRequestForm.status;
    } catch (errors) {
      console.log(`No Data Found >>> ${errors}`);
    }
  }
);

export const updateEmployeeAsync = createAsyncThunk(
  "update-employee-async",
  async ({
    addEmployees,
    id,
  }: {
    addEmployees: IProfileRequest;
    id: number;
  }) => {
    console.log(addEmployees);
    try {
      const employeeForm = await API.put(
        ` http://localhost:8000/person/${id}`,
        addEmployees
      );
      return employeeForm.status;
    } catch (errors) {
      console.log(`No Data Found >>> ${errors}`);
    }
  }
);

export const deleteEmployeeAsync = createAsyncThunk(
  "delete-employee-async",
  async ({ id }: { id: number }) => {
    try {
      const employeeForm = await API.delete(
        `http://localhost:8000/person/${id}`
      );
      return employeeForm.data;
    } catch (errors) {
      console.log(`No Data Found >>> ${errors}`);
    }
  }
);

const employeeDetailSlice = createSlice({
  name: "profileDetails",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    employeeUpdated(state, action) {
      const { id, users } = action.payload;
      const updatedPerson = users.find(findUserId);
      function findUserId(item: any) {
        return item.id === id;
      }
      console.log(updatedPerson);
      if (updatedPerson) {
        state.profileDetail = updatedPerson;
      }
    },

    updatePasswordId: (state, action) => {
      state.updatePassword = action.payload;
    },
    createEmployeeProfile: (state) => {
      state.profileDetail = {
        EmployeeId: "",
        FirstName: "",
        LastName: "",
        EmailAddress: "",
        MobileNumber: 0,
        DOB: new Date(),
        JoinedDate: new Date(),
        Supervisor: "",
        Department: "",
        Role: "",
        PermanentAddress: "",
        TemporaryAddress: "",
        Password: "",
        SkypeId: "",
        Designation: "",
        GithubId: "",
      };
    },

    filterEmployee: (state, action) => {
      const { searchItems, userData } = action.payload;
      var userInfo: IProfileRequest[] = [];
      userData.filter((value: IProfileRequest) => {
        if (value.FirstName.toLowerCase().includes(searchItems.toLowerCase())) {
          console.log(value);
          userInfo.push(value);
        }
        return (state.filterUserData = userInfo);
      });
    },
    filterDepartment: (state, action) => {
      const { Department, userData } = action.payload;
      console.log(action.payload);
      var userDepartment: IProfileRequest[] = [];
      userData.map((contents: IProfileRequest) => {
        if (contents.Department === Department) {
          console.log(contents);
          userDepartment.push(contents);
        }
      });
      state.filterUserData = userDepartment;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(profileDetailsAsync.pending, (state) => {
        state.inProgress = true;
      })
      .addCase(profileDetailsAsync.fulfilled, (state, action: any) => {
        state.inProgress = false;
        console.log("Get Profile Details >>> ", action);
        if (action.payload) {
          state.profileDetails = action.payload;
          state.filterUserData = action.payload;
        }
      })
      .addCase(addEmployeesAsync.pending, (state) => {
        state.inProgress = true;
      })
      .addCase(addEmployeesAsync.fulfilled, (state, action) => {
        state.inProgress = false;
        if (action.payload) {
          toast.success("Employee Added");
        }
      })

      .addCase(updateEmployeeAsync.fulfilled, (state, action) => {
        state.inProgress = false;
        if (action.payload) {
          toast.info("Employee Updated successfully");
        }
      })

      .addCase(deleteEmployeeAsync.pending, (state) => {
        state.inProgress = true;
        toast.error("Employee Deleted");
      })
      .addCase(deleteEmployeeAsync.fulfilled, (state, action) => {});
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
});
export const {
  employeeUpdated,
  createEmployeeProfile,
  filterEmployee,
  filterDepartment,
  updatePasswordId,
} = employeeDetailSlice.actions;

export default employeeDetailSlice.reducer;
