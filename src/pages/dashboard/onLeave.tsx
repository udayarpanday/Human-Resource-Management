import React, { useEffect } from 'react'
import { LeaveSummaryTable, TableContents, TableImage } from '../../components/tables/Table-styled';
import { CommonContainer } from '../../styles/Container.styled';
import { SectionHeader } from '../../styles/sectionTitle.styled';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { leaveDetails } from '../leaves/selectors';
import { formatDate } from '../../utilities/tools';
import { leaveDetailsAsync } from '../leaves/reducer';


const OnLeave = () => {
  const onLeave=useAppSelector(leaveDetails)
  const dispatch=useAppDispatch()
  useEffect(() => {
    dispatch(leaveDetailsAsync())
  }, [])
    return (
        <CommonContainer>
        <SectionHeader>
          <h5>On Leave</h5>
        </SectionHeader>
        <TableContents>
          <LeaveSummaryTable>
          <table>
            <thead>
         
            <th>Name</th>
            <th>Projects</th>
            <th>From - To</th>
            </thead>
            <tbody>
            {onLeave.map((data: any) => {
              const { Name, LeaveFrom, LeaveTo,id} = data;
              return (
                <tr>
                   <td key={id}>
                  <TableImage>
                    <div>
                      <span>{Name}</span>
                    
                    </div>
                  </TableImage>
                </td>
                  <td>My Sherpa</td>
                  <td>{formatDate(LeaveFrom)}-{formatDate(LeaveTo)}</td>
                </tr>
              );
            })}
             </tbody>
          </table>
          </LeaveSummaryTable>
        </TableContents>
      </CommonContainer>
    )
}

export default OnLeave
