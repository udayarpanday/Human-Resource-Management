import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import API from "../../helper";
import { IProject } from "../../interface/IProject";

export interface IProjectState {
  handleModal: boolean;
  inProgress: boolean;
  status: number;
  projectDetails: IProject[];
  currentAction: string;
  projectDetail: IProject;
}
const ProjectTeamsDetailsData = [
  {
    Name: "",
    Image: "",
  },
];

const ProjectDetailsData = [
  {
    id: 0,
    ProjectName: "",
    StartDate: new Date(),
    EndDate: new Date(),
    TeamMember: ProjectTeamsDetailsData,
    TeamLead: "",
    Image: "",
  },
];

const ProjectDetail = {
  id: 0,
  ProjectName: "",
  StartDate: new Date(),
  EndDate: new Date(),
  TeamMember: ProjectTeamsDetailsData,
  TeamLead: "",
  Image: "",
};

export const initialState: IProjectState = {
  inProgress: false,
  status: 0,
  projectDetails: ProjectDetailsData,
  currentAction: "",
  projectDetail: ProjectDetail,
  handleModal: false,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const projectDetailsAsync = createAsyncThunk(
  "project-details-async",
  async () => {
    try {
      const projectDetailsResponse = await API.get(
        `http://localhost:8000/projects`
      );
      return projectDetailsResponse.data;
    } catch (errors) {
      console.log(`No Data Found >>> ${errors}`);
    }
  }
);

export const updateProjectAsync = createAsyncThunk(
  "update-project-async",
  async ({ addProject, id }: { addProject: IProject; id: number }) => {
    console.log(addProject);
    try {
      const projectForm = await API.put(
        ` http://localhost:8000/projects/${id}`,
        addProject
      );
      return projectForm.status;
    } catch (errors) {
      console.log(`No Data Found >>> ${errors}`);
    }
  }
);

export const addProjectAsync = createAsyncThunk(
  "add-project-async",
  async ({ addProject }: { addProject: IProject }) => {
    try {
      const projectForm = await API.post(
        `http://localhost:8000/projects`,
        addProject
      );
      return projectForm.status;
    } catch (errors) {
      console.log(`No Data Found >>> ${errors}`);
    }
  }
);

export const deleteProjectAsync = createAsyncThunk(
  "delete-project-async",
  async ({ id }: { id: number }) => {
    try {
      console.log(id);
      const projectsForm = await API.delete(
        `http://localhost:8000/projects/${id}`
      );
      return { id };
    } catch (errors) {
      console.log(`No Data Found >>> ${errors}`);
    }
  }
);

const projectDetailSlice = createSlice({
  name: "projectDetails",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // TODO : need to revist again.

    projectUpdated(state, action) {
      const { id, project } = action.payload;
      const updatedProject = project.find(findUserId);
      function findUserId(item: any) {
        return item.id === id;
      }
      console.log(updatedProject);
      if (updatedProject) {
        state.projectDetail = updatedProject;
      }
    },

    createEmployee: (state) => {
      state.projectDetail = {
        id: 0,
        ProjectName: "",
        StartDate: new Date(),
        EndDate: new Date(),
        TeamMember: [],
        TeamLead: "",
        Image: "",
      };
    },
    userAction: (state, action) => {
      state.currentAction = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(projectDetailsAsync.pending, (state: any) => {
        state.inProgress = true;
      })
      .addCase(projectDetailsAsync.fulfilled, (state, action: any) => {
        state.inProgress = false;
        console.log("Get Project Details >>> ", action);
        if (action.payload) {
          state.projectDetails = action.payload;
        }
      })
      .addCase(addProjectAsync.pending, (state) => {
        state.inProgress = true;
      })

      .addCase(updateProjectAsync.fulfilled, (state) => {
        state.inProgress = false;
        toast.info("updated Project Sucessfully");
      })

      .addCase(addProjectAsync.fulfilled, (state, action) => {
        state.inProgress = false;
        if (action.payload) {
          toast.success("Project Added");
        }
      })

      .addCase(deleteProjectAsync.pending, (state) => {
        state.inProgress = true;

        toast.error("Deleted ");
      })
      .addCase(deleteProjectAsync.fulfilled, (state, action: any) => {
        state.inProgress = false;
        console.log("Project Deleted >>> ", action);
      });
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
});

export const { createEmployee, projectUpdated,userAction } = projectDetailSlice.actions;

export default projectDetailSlice.reducer;
