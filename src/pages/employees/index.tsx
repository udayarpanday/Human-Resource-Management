import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar";
import SideBar from "../../components/sideBar";
import {
  ContainerStyles,
  DataDisplay,
  DataDisplayContainer,
  DataDisplayContents,
  PageContainer,
  EmployeeContainer,
  DataSelectorsContainer,
  TitleContainer,
} from "../../styles/Container.styled";
import { SectionTitleStyles } from "../../styles/sectionTitle.styled";
import EmployeeDetailsTable from "./employeesDetailsTable";

import {
  EmployeeInputFieldStyles,
} from "../../components/inputFields/InputFields.styled";
import { SecondaryButton } from "../../components/buttons/Buttons.styled";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { profileDetails } from "../profile/selector";
import {
  filterDepartment,
  filterEmployee,
  profileDetailsAsync,
} from "../profile/reducer";
import userDetails from "../../utilities/localStorage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface EmployeeBody {
  sideBar: boolean;
}
const Employee = (props: EmployeeBody) => {
  const [search, setSearch] = useState("default");
  const userData = useAppSelector(profileDetails);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(profileDetailsAsync());
  }, []);

  const filterByNames = (e: any) => {
    dispatch(
      filterEmployee({ searchItems: e.target.value, userData: userData })
    );
    if (e.target.value === "") {
      dispatch(profileDetailsAsync());
    }
  };

  const filterByDepartment = (e: any) => {
    if(e.target.value==="default"){
      dispatch(profileDetailsAsync());
    }
    dispatch(
      filterDepartment({ Department: e.target.value, userData: userData })
    );
    setSearch(e.target.value);
  };
  return (
    <>
     <ToastContainer autoClose={2000} />
      <NavBar />
      <PageContainer>
        <SideBar />
        <ContainerStyles sideBarWidth={props.sideBar}>
          <form>
            <TitleContainer>
              <SectionTitleStyles>
                <h4>Employee</h4>
              </SectionTitleStyles>
              {userDetails.Role === "Admin" && (
                <SecondaryButton>
                  <Link to="/addUser">
                    <button>Add Employees</button>
                  </Link>
                </SecondaryButton>
              )}
            </TitleContainer>
            <EmployeeContainer>
              <DataSelectorsContainer>
                <EmployeeInputFieldStyles>
                  <input
                    type="text"
                    placeholder="Search By Name"
                    onChange={(e) => filterByNames(e)}
                  ></input>
                  
                </EmployeeInputFieldStyles>
                <EmployeeInputFieldStyles>
                  <select
                    name="department"
                    id="department"
                    onChange={(e) => filterByDepartment(e)}
                  >
                    <option value="default">Search By Department</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Data">Data</option>
                    <option value="Management">Management</option>
                  </select>
                </EmployeeInputFieldStyles>
              </DataSelectorsContainer>
            </EmployeeContainer>
          </form>

          <DataDisplay>
            <DataDisplayContainer>
              <DataDisplayContents>
                <p>Total Employee</p>
                <h4>{userData.length}</h4>
              </DataDisplayContents>
            </DataDisplayContainer>
            <DataDisplayContainer>
              <DataDisplayContents>
                <p>New Employee</p>
                <h4>100</h4>
              </DataDisplayContents>
            </DataDisplayContainer>
            <DataDisplayContainer>
              <DataDisplayContents>
                <p>Male</p>
                <h4>400</h4>
              </DataDisplayContents>
            </DataDisplayContainer>
            <DataDisplayContainer>
              <DataDisplayContents>
                <p>Female</p>
                <h4>100</h4>
              </DataDisplayContents>
            </DataDisplayContainer>
          </DataDisplay>
          <EmployeeDetailsTable />
        </ContainerStyles>
      </PageContainer>
    </>
  );
};
export default Employee;
