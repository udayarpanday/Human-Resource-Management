import React from "react";
import {
  HoverContainer,
  HoverIcon,
  TableContents,
  TableImage,
} from "../../components/tables/Table-styled";
import { CommonContainer } from "../../styles/Container.styled";
import { MdModeEditOutline, MdDeleteForever } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { filterUserData, profileDetails } from "../profile/selector";
import { useHistory } from "react-router-dom";
import { formatDate } from "../../utilities/tools";
import {
  deleteAction,
  toggleDialogBox,
} from "../../components/modal/dialogBox/reducer";
import DialogBox from "../../components/modal/dialogBox";
import { viewOnly } from "../../components/modal/addEventsModal/reducer";
import { employeeUpdated } from "../profile/reducer";
import userDetails from "../../utilities/localStorage";

const EmployeeDetailsTable = (props: any) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(profileDetails);
  let history = useHistory();

  const deleteRecord = (id: number) => {
    dispatch(toggleDialogBox(true));
    dispatch(deleteAction({ userAction: "employees", id: id }));
  };
  const viewRecords = (id: number) => {
    dispatch(employeeUpdated({ id: id, users: users }));
    history.push(`/profile/${id}`);
  };
  const editRecords = (id: number) => {
    dispatch(viewOnly(false));
    history.push(`/edit-profile/${id}`);
  };

  return (
    <CommonContainer>
      <TableContents>
        <table>
          <thead>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Phone NO.</th>
            <th>Join Date</th>
            <th>Role</th>
            <th>Action</th>
          </thead>
          <tbody>
            {useAppSelector(filterUserData).map((contents: any) => {
              const {
                EmployeeId,
                FirstName,
                LastName,
                EmailAddress,
                MobileNumber,
                JoinedDate,
                Role,
                Image,
                id,
              } = contents;
              return (
                <tr key={id}>
                  <td>
                    <TableImage>
                      <img src={Image} alt="user" />
                      <div>
                        <span>
                          {FirstName} {LastName}
                        </span>
                        <p>{EmailAddress}</p>
                      </div>
                    </TableImage>
                  </td>
                  <td>{EmployeeId}</td>
                  <td>{MobileNumber}</td>
                  <td>{formatDate(JoinedDate)}</td>
                  <td>{Role}</td>
                  <td>
                    <HoverContainer>
                      <HoverIcon color="#5BC76C">
                        <BsFillEyeFill onClick={() => viewRecords(id)} />
                      </HoverIcon>
                      {userDetails.Role === "Admin" && (
                        <>
                          <HoverIcon color="#0DA5E9">
                            <MdModeEditOutline
                              onClick={() => editRecords(id)}
                            />
                          </HoverIcon>

                          <HoverIcon color="#EE3524">
                            <MdDeleteForever onClick={() => deleteRecord(id)} />
                            <DialogBox
                              header={"Click Yes to proceed"}
                            ></DialogBox>
                          </HoverIcon>
                        </>
                      )}
                    </HoverContainer>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableContents>
    </CommonContainer>
  );
};

export default EmployeeDetailsTable;
