export interface IProjectTeams{
  Image?:string;
  Name?:string
  id?:number
}
export interface IProject {
    id?:number
    ProjectName:string,
    StartDate:Date,
    EndDate:Date,
    TeamMember:IProjectTeams[]
    TeamLead:string,
    Image?:string
  }


  