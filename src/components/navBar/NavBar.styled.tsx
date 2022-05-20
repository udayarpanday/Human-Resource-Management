import styled from "styled-components";
import { device } from "../../styles/Breakpoints";

export const NavigationBarContainer = styled.header<{ sideBar: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.primaryBlackColor};
  padding: 15px 25px;
  position: fixed;

  left: ${({ sideBar }) => (sideBar ? "100px" : "300px")};
  @media ${device.laptop} {
    left: ${({ sideBar }) => (sideBar ? "250px" : "0px")};
  }
  right: 0;
  z-index: 999;
  height: 60px;
`;

export const TopNavLogo = styled.div`
  display: flex;
  align-items: center;
`;
export const MenuIcon = styled.div`
  display: flex;
  align-items: center;
  button {
    background: none;
    border: none;
    cursor: pointer;
  }
  svg {
    font-size: 30px;
    color: white;
    cursor: pointer;
  }
`;
export const NotificationIcon = styled.div`
  img {
    width: 32px;
    height: 32px;
    object-fit: contain;
    cursor: pointer;
  }
`;
export const SearchBar = styled.div`
  margin-left: 20px;
  height: 40px;
  width: 600px;
  border-radius: 5px;
  border: none;
  outline: none;
  @media ${device.laptop} {
    width: 500px;
  }
  @media ${device.tablet} {
    width: 300px;
    height: 35px;
  }
  @media ${device.mobileL} {
    width: 215px;
  }
  svg{
    color: #000;
  }
`;
