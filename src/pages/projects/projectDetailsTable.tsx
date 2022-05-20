import React, { useState } from "react";
import {
  HoverContainer,
  HoverIcon,
  TableContents,
  TableImage,
  TeamsImage,
} from "../../components/tables/Table-styled";
import { CommonContainer } from "../../styles/Container.styled";
import { MdModeEditOutline, MdDeleteForever } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { projectDetails } from "./selector";
import { useHistory } from "react-router-dom";
import { formatDate } from "../../utilities/tools";
import DialogBox from "../../components/modal/dialogBox";
import {
  deleteAction,
  toggleDialogBox,
} from "../../components/modal/dialogBox/reducer";
import { viewOnly } from "../../components/modal/addEventsModal/reducer";
import ReactTooltip from "react-tooltip";
import { userAction } from "./reducer";
import userDetails from "../../utilities/localStorage";

const ProjectDetailsTable = () => {
  const [totalImage, setCount] = useState(null);
  const dispatch = useAppDispatch();
  let history = useHistory();

  const deleteRecord = (id: number) => {
    dispatch(toggleDialogBox(true));
    dispatch(deleteAction({ userAction: "project", id: id }));
  };

  const viewRecords = (id: number) => {
    dispatch(viewOnly(true));
    history.push(`/editProjects/${id}`);
    dispatch(userAction("View"));
  };
  const editRecords = (id: number) => {
    dispatch(viewOnly(false));
    history.push(`/editProjects/${id}`);
    dispatch(userAction("Update"));
  };

  return (
    <CommonContainer>
      <TableContents>
        <table>
          <thead>
            <th>PROJECT</th>
            <th>START DATE</th>
            <th>END DATE</th>
            <th>TEAMS</th>
            <th>LEAD</th>
            <th>Action</th>
          </thead>
          <tbody>
            {useAppSelector(projectDetails).map((contents: any) => {
              const {
                Image,
                ProjectName,
                StartDate,
                EndDate,
                TeamMember,
                TeamLead,
                id,
              } = contents;
              const total = TeamMember.length;
              return (
                <tr key={id}>
                  <td>
                    <TableImage>
                      <img src={Image} alt="user Image" />
                      <div>
                        <span>{ProjectName}</span>
                      </div>
                    </TableImage>
                  </td>
                  <td>{formatDate(StartDate)}</td>
                  <td>{formatDate(EndDate)}</td>
                  <td>
                    <TeamsImage>
                      <ul>
                        <ReactTooltip place="bottom" />
                        {TeamMember.map(
                          (members: any, index: number) =>
                            index < 5 && (
                              <>
                                <li>
                                  <img
                                    data-tip={members.name}
                                    src={members.image}
                                    alt="user"
                                  />
                                </li>
                              </>
                            )
                        )}
                      </ul>
                      {total > 5 && <span>+{total - 5}</span>}
                    </TeamsImage>
                  </td>
                  <td>{TeamLead}</td>
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

export default ProjectDetailsTable;
