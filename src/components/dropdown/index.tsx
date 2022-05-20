import React, { useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AiOutlineEllipsis } from "react-icons/ai";
import { DropdownPosition, DropdownStyle } from "./Dropdown-styled";
import { ListItemIcon, ListItemText, MenuList } from "@mui/material";
import { FaUserAlt } from "react-icons/fa";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { Link, useHistory } from "react-router-dom";
import userDetails from "../../utilities/localStorage";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { profileDetails } from "../../pages/profile/selector";
import { employeeUpdated, profileDetailsAsync } from "../../pages/profile/reducer";

const LoginMenu = () => {
  const dispatch = useAppDispatch();
  let history = useHistory();
  const users=useAppSelector(profileDetails)
  
useEffect(() => {
  dispatch(profileDetailsAsync());
}, [])

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const viewProfile = () => {
    dispatch(employeeUpdated({ id: userDetails.id, users: users }));
    history.push(`/profile/${userDetails.id}`);
  };
  return (
    <>
      <DropdownPosition>
        <AiOutlineEllipsis
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        />

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <DropdownStyle>
            <MenuList>
              <MenuItem onClick={()=>viewProfile()}>
                <ListItemIcon>
                  <FaUserAlt />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
              <MenuItem>
                <Link to="/">
                  <ListItemIcon>
                    <RiLogoutCircleRFill />
                  </ListItemIcon>
                  <ListItemText
                    onClick={() => {
                      localStorage.removeItem("user");
                    }}
                  >
                    Logout
                  </ListItemText>
                </Link>
              </MenuItem>
            </MenuList>
          </DropdownStyle>
        </Menu>
      </DropdownPosition>
    </>
  );
};

export default LoginMenu;
