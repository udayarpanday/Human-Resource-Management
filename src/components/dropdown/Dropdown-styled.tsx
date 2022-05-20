import styled from "styled-components";

export const DropdownPosition = styled.div`
  .css-10nakn3-MuiModal-root-MuiPopover-root-MuiMenu-root {
    position: absolute !important;
    z-index: 1300;
    right: 0;
    bottom: 0;
    top: -130px !important;
    left: -60px !important;
  }
`;
export const DropdownStyle = styled.div`
  cursor: pointer;
  div {
    padding: 0;
  }
  ul {
    padding: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
  li {
    color: #000;
    :first-of-type {
      border-bottom: 2px solid #000;
    }
  }
  span {
    font-family: "Manrope", sans-serif;
  }
  svg {
    /* padding-right: 15px; */
    color: #000;
  }
  a{
    display: flex;
    align-items: center;
  }
`;
