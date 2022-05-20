import { Link, NavLink } from "react-router-dom";
import { links } from "./Links";
import {
  DesktopViewLogo,
  DetailsContent,
  LinkStyles,
  MobileViewLogo,
  SideBarContents,
  SideBarLogo,
  UserDetails,
} from "./SideBar-styled";

import { useAppSelector } from "../../app/hooks";
import { sideBarHidden } from "../navBar/selector";
import UserImage from "../../images/UserImage.png";
import Logo from "../../images/Infinite.svg";
import HalfLogo from "../../images/Infinite-icon.svg";
import LoginMenu from "../dropdown";
import userDetails from "../../utilities/localStorage";

const SideBar = () => {
  const sideBar = useAppSelector(sideBarHidden);
  //TODO
  //Create a function to check user local storage and set empty Iprofilereq object if null

  return (
    <SideBarContents sideBar={sideBar}>
      <SideBarLogo sideBar={sideBar}>
        <DesktopViewLogo>
          <Link to="/">
            {sideBar ? (
              <img src={HalfLogo} alt="HR-logo"></img>
            ) : (
              <img src={Logo} alt="HR-icon"></img>
            )}
          </Link>
        </DesktopViewLogo>
        <MobileViewLogo>
          <Link to="/">
            <img src={Logo} alt="HR-icon"></img>
          </Link>
        </MobileViewLogo>
      </SideBarLogo>
      <ul>
        {links.map((link) => {
          const { id, url, title, icon } = link;
          return (
            <li key={id}>
              <NavLink to={url} activeStyle={{ color: "#EE3524" }}>
                <LinkStyles>
                  {icon}
                  <p>{title}</p>
                </LinkStyles>
              </NavLink>
            </li>
          );
        })}
      </ul>

      <UserDetails sideBar={sideBar}>
        <img src={UserImage} alt="User Image"></img>

        <DetailsContent>
          <h6>
            {userDetails.FirstName} {userDetails.LastName}
          </h6>
          <span>{userDetails.EmailAddress}</span>
        </DetailsContent>
        <LoginMenu />
      </UserDetails>
    </SideBarContents>
  );
};

export default SideBar;
