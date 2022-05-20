import styled, { css } from "styled-components";
import { device } from "../../styles/Breakpoints";

const hidden = css`
  width: 100px;
  /* transition: 0.6s all ease; */
  li {
    padding-bottom: 30px;
    padding-left: 30px;
    svg {
      font-size: 30px;
    }
  }
  p {
    display: none;
  }
  @media ${device.laptop} {
    width: 250px;

    li {
      svg {
        /* transition: 0.6s all ease; */
        font-size: 25px;
      }
    }
    p {
      /* transition: 0.6s all ease; */
      padding-left: 20px;
      display: block;
    }
  } ;
`;
const normal = css`
  width: 300px;
  /* transition: 0.6s all ease; */
  li {
    /* transition: 0.6s all ease; */
    padding-bottom: 30px;
    padding-left: 30px;
    svg {
      font-size: 30px;
    }
    p {
      padding-left: 20px;
    }
  }
  @media ${device.laptop} {
    width: 0px;
    li {
      padding-bottom: 0px;
      padding-left: 0px;
      svg {
        font-size: 25px;
      }
    }
    p {
      /* transition: 0.6s all ease; */
      display: none;
    }
  }
`;

export const SideBarContents = styled.div<{ sideBar: boolean }>`
  z-index: 999;
  background-color: ${({ theme }) => theme.colors.primaryBlackColor};
  ${({ sideBar }) => (sideBar ? hidden : normal)}
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0px;
  height: 100%;
  img {
    cursor: pointer;
    object-fit: contain;
  }
  ul {
    padding-top: 30px;
  }
  li {
    a {
      color: ${({ theme }) => theme.colors.primaryWhiteColor};

      :hover {
        color: ${({ theme }) => theme.colors.primaryRedColor};
      }
    }
  }
`;
export const SideBarLogo = styled.div<{ sideBar: boolean }>`
  padding: 10px 30px;
  @media ${device.laptop} {
    padding: ${({ sideBar }) => !sideBar && "0"};
  }
  position: relative;
  text-align: center;
  ::after {
    position: absolute;
    content: "";
    bottom: ${({ sideBar }) => (sideBar ? "-15px" : "4px")};
    @media ${device.laptop} {
      bottom: -5px;
    }
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #ee3524;
  }
`;

export const LinkStyles = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 25px;
    width: 25px;
    object-fit: contain;
  }
`;

export const UserDetails = styled.div<{ sideBar: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ sideBar }) => sideBar && "center"};
  color: #ffffff;
  padding: 0 15px;
  margin-top: auto;
  margin-bottom: 40px;
  img {
    height: 80px;
    width: 80px;
    @media ${device.laptop}{
      height: 60px;
      width: 60px;

    }
  }
  span {
    font-size: 12px;
  }
  svg {
    font-size: 30px;
    cursor: pointer;
  }
  div,
  svg {
    display: ${({ sideBar }) => sideBar && "none"};
    @media ${device.laptop} {
      display: ${({ sideBar }) => sideBar && "block"};
    }
  }
  @media ${device.laptop} {
    display: ${({ sideBar }) => !sideBar && "none"};
  }
`;
export const DetailsContent = styled.div`
  padding: 0 15px;
`;
export const MobileViewLogo = styled.div`
  display: none;
  @media ${device.laptop} {
    
      display: block;
  }
`;
export const DesktopViewLogo = styled.div`
  display: block;
  @media ${device.laptop} {
    
      display: none;
    
  }
`;
