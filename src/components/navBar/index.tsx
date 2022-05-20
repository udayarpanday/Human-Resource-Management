import { useEffect, useState } from "react";
import {
  MenuIcon,
  NavigationBarContainer,
  NotificationIcon,
  SearchBar,
  TopNavLogo,
} from "./NavBar.styled";

import Bell from "../../images/bell.png";
import { GiHamburgerMenu } from "react-icons/gi";

import { useAppDispatch } from "../../app/hooks";
import { hideSideBar } from "./reducer";
import { useAppSelector } from "../../app/hooks";
import { sideBarHidden } from "../navBar/selector";
import {
  employeeUpdated,
  profileDetailsAsync,
} from "../../pages/profile/reducer";
import { profileDetails } from "../../pages/profile/selector";
import { useHistory } from "react-router-dom";
import Select from "react-select";

const NavBar = () => {
  let history = useHistory();
  const dispatch = useAppDispatch();
  const userData = useAppSelector(profileDetails);
  const sideBar = useAppSelector(sideBarHidden);
  useEffect(() => {
    dispatch(profileDetailsAsync());
  }, []);

  const sideBarToggle = () => {
    dispatch(hideSideBar());
  };

  var options:{value:number | undefined ;label:string} [] = [];
  userData.forEach((user) => {
    options.push({ value: user.id, label: user.FirstName + user.LastName });
  });

  return (
    <>
      <NavigationBarContainer sideBar={sideBar}>
        <TopNavLogo>
          <MenuIcon>
            <GiHamburgerMenu onClick={sideBarToggle} />
            <SearchBar>
              <Select
                placeholder="Search Employees"
                options={options}
                onChange={(e: any) => {
                  dispatch(employeeUpdated({ id: e.value, users: userData }));
                  history.push(`/profile/${e.value}`);
                }}
              />
            </SearchBar>

          </MenuIcon>
        
        </TopNavLogo>
        <NotificationIcon>
          <img src={Bell} alt="Notification Bell"></img>
        </NotificationIcon>
      </NavigationBarContainer>
    </>
  );
};

export default NavBar;
