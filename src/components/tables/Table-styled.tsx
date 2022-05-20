import styled from "styled-components";
import { device } from "../../styles/Breakpoints";

export const TableContents = styled.div`
  /* padding: 15px; */
  overflow-y: auto;
  border-radius: 3px;

  @media ${device.tablet} {
    display: block;
    overflow: auto;
  }
  
  /* border: 1px solid #dfdfdf; */
  table {
    border-spacing: 0;
    width: 100%;
    display: table;
    border-collapse: collapse;
    border: 1px solid #dfdfdf;

    th {
      padding-bottom: 10px;
      text-transform: uppercase;
      text-align: left;
      width: 300px;
      color: #686868;
      font-weight: 300;
      padding-left: 10px;
      padding-top: 10px;
      border-bottom: 1px solid #e5e5e5;
    }
    td {
      text-align: left;
      padding: 14px;

    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

      :first-of-type {
        padding: 10px;
      }
      width: fit-content;
      svg {
        font-size: 18px;
        :not(:last-of-type) {
          margin-right: 12px;
        }
      }
    }
    tr {
      background-color: #fff;
      text-align: center;

      :nth-of-type(even) {
        background-color: #f2f2f2;
      }
    }
    
  }
`;

export const LeaveSummaryTable = styled.div`
  height: 400px;
  table {
    border: none;
    td{
      font-size: 14px;
    }
  }
  table > tr {
    background-color: #fff;
  }
  

  table > tr > td,
  span {
    padding: 0px;
    font-size: 14px;
  }
`;

export const TableEvent = styled.div`
  margin: 17px 8px 14px 15px;
  height: 450px;

  table {
    border: none;
    tr {
      td {
        text-align: center;
        font-size: 14px;
      }
    }
  }

  table > tr > td,
  span {
    font-size: 18px;
  }
`;

export const HoverIcon = styled.div`
  padding-right: 10px;
  :hover {
    color: ${(props) => props.color};
    cursor: pointer;
  }
`;

export const HoverContainer = styled.div`
  display: flex;
`;

export const TableImage = styled.div`
  display: flex;
  align-items: center;
  div {
    padding: 0 13px;
    text-align: left;
    p {
      color: #6c757d;
    }
    
  }
  img {
      width: 32px;
      height: 32px;
      object-fit: contain;
      border-radius: 100px;
    }
`;
export const TeamsImage = styled.div`
  display: flex;
  align-items: center;
  ul {
    li {
      z-index: 9;
      position: relative;
      display: inline-block;
      border-radius: 50%;
      width:32px ;
      height: 32px;
      img{
        object-fit: cover;
      }
      & +li {
        margin-left: -15px;
      }
      :hover {
        z-index: 999;
      }
    }
  }
  span {
    margin-left: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #89eac7;
    height: 35px;
    width: 35px;
    border-radius: 100%;
    font-size: 16px;
    font-weight: bold;
  }
`;

export const LeaveModule = styled.div`

display: block;
width: 50px;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
`;

