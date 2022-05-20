import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/global";
import { Router } from "react-router";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import UserProfile from "./pages/profile/editProfile/index";
import { theme } from "./styles/Theme";
import { useAppSelector } from "./app/hooks";
import { sideBarHidden } from "./components/navBar/selector";
import Employee from "./pages/employees";
import LeaveDetails from "./pages/leaves/leaveRecords";
import MainProfile from "./pages/profile/userProfile";
import ProjectDetails from "./pages/projects";
import AddProjects from "./pages/projects/addProjects";
import LeaveRequestDetails from "./pages/leaves/leaveRequest";


import history from "./utilities/history";
import LeaveRequest from "./pages/leaves/leaveRequest";
import Forget from "./pages/login/confirmEmail";
import ConfirmPass from "./pages/login/confirmPass";

const App = () => {
  const sideBar = useAppSelector(sideBarHidden);
  // const[isAuth,setIsAuth]=useState(false);
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router history={history}>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard sideBar={sideBar} />
            </Route>
            <Route exact path="/edit-profile">
              <UserProfile sideBar={sideBar} />
            </Route>
            <Route exact path="/employees">
              <Employee sideBar={sideBar} />
            </Route>
            <Route exact path="/leave-records">
              <LeaveDetails sideBar={sideBar} />
            </Route>
            <Route exact path="/leave-requests">
              <LeaveRequest sideBar={sideBar} />
            </Route>
            <Route exact path="/profile/:id">
              <MainProfile sideBar={sideBar} />
            </Route>
            <Route exact path="/projects">
              <ProjectDetails sideBar={sideBar} />
            </Route>
            <Route exact path="/addprojects">
              <AddProjects sideBar={sideBar} />
            </Route>
            <Route exact path="/adduser">
              <UserProfile sideBar={sideBar} />
            </Route>
            <Route exact path="/editProjects/:id">
              <AddProjects sideBar={sideBar} />
            </Route>
            <Route exact path="/edit-profile/:id">
              <UserProfile sideBar={sideBar} />
            </Route>
            <Route exact path="/login/recovery">
              <Forget />
            </Route>
            <Route exact path="/password/confirm">
              <ConfirmPass />
            </Route>


          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
