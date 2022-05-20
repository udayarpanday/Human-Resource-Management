import { TableContents } from "../../../components/tables/Table-styled";
import {
  CommonContainer,
  PageContainer,
} from "../../../styles/Container.styled";
import { PageContents } from "../../../styles/Container.styled";
import {
  ProfileBox,
  ProfileDetails,
  ProfileDetailsTitle,
  ProfileSection,
  UserProfile,
} from "../Profile-Style";
import { formatDate } from "../../../utilities/tools";
import { IProfileRequest } from "../../../interface/IProfileRequest";
interface IProfileLower {
  userDetails: IProfileRequest;
}
const ProfileLower = (props:IProfileLower) => {
  const userProfile = [
    {
      Birthday: "Feb 21",
      Supervisor: "Suraj Vaidya",
      Department: "Development",
      Employeesince: "(2021-05-05) 6 months",
      PermanentAddress: "Baneshwor, Kathmandu",
      TemporaryAddress: "Baneshwor, Kathmandu",
    },
  ];
  const userProject = [
    {
      Project: "Qkly Internal Project",
      Role: "Frontend Development",
      StartDate: "20 oct 21",
      EndDate: "On Going",
    },
  ];

  return (
    <ProfileBox>
      <CommonContainer>
        <ProfileSection>
          <PageContents>
            <UserProfile>
              <PageContainer>
                <ProfileDetailsTitle>
                  <h5> Birthday </h5>
                </ProfileDetailsTitle>
                <ProfileDetails>
                  <p>{formatDate(props.userDetails.DOB)}</p>
                </ProfileDetails>
              </PageContainer>
              <PageContainer>
                <ProfileDetailsTitle>
                  <h5> Supervisor</h5>
                </ProfileDetailsTitle>
                <ProfileDetails>
                  <p>{props.userDetails.Supervisor}</p>
                </ProfileDetails>
              </PageContainer>
              <PageContainer>
                <ProfileDetailsTitle>
                  <h5> Department </h5>
                </ProfileDetailsTitle>
                <ProfileDetails>
                  <p>{props.userDetails.Department}</p>
                </ProfileDetails>
              </PageContainer>
              <PageContainer>
                <ProfileDetailsTitle>
                  <h5> Employee Since </h5>
                </ProfileDetailsTitle>
                <ProfileDetails>
                  <p>{formatDate(props.userDetails.JoinedDate)}</p>
                </ProfileDetails>
              </PageContainer>
              <PageContainer>
                <ProfileDetailsTitle>
                  <h5> Permanent Address</h5>
                </ProfileDetailsTitle>
                <ProfileDetails>
                  <p>{props.userDetails.PermanentAddress}</p>
                </ProfileDetails>
              </PageContainer>
              <PageContainer>
                <ProfileDetailsTitle>
                  <h5> Temporary Address </h5>
                </ProfileDetailsTitle>
                <ProfileDetails>
                  <p>{props.userDetails.TemporaryAddress}</p>
                </ProfileDetails>
              </PageContainer>
              <PageContainer>
                <ProfileDetailsTitle>
                  <h5>Projects</h5>
                </ProfileDetailsTitle>
              </PageContainer>
            </UserProfile>
          </PageContents>
          <TableContents>
            <table>
              <thead>
                <th>PROJECT</th>
                <th>ROLE</th>
                <th>START DATE</th>
                <th>END DATE</th>
              </thead>
              <tbody>
                {userProject.map((newData) => {
                  const { Project, Role, StartDate, EndDate } = newData;
                  return (
                    <tr>
                      <td>{Project}</td>
                      <td>{Role}</td>
                      <td>{StartDate}</td>
                      <td>{EndDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TableContents>
        </ProfileSection>
      </CommonContainer>
    </ProfileBox>
  );
};

export default ProfileLower;
