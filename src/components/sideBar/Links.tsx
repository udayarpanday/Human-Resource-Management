import {RiDashboardLine} from 'react-icons/ri'
import {BsCalendar3Week} from 'react-icons/bs'
import {SiTarget} from 'react-icons/si'
import {BsListTask} from 'react-icons/bs'
import {MdDetails} from 'react-icons/md'

export const links = [
  {
    id: 1,
    url: '/dashboard',
    title: 'Dashboard',
    icon: <RiDashboardLine/>
  },
  {
    id: 2,
    url: '/leave-records',
    title: 'Leave Records',
    icon: <BsCalendar3Week/>
  },
  {
    id: 3,
    url: '/leave-requests',
    title: 'Leave Requests',
    icon: <SiTarget/>
  },
  {
    id: 4,
    url: '/employees',
    title: 'Employees List',
    icon: <BsListTask/>
  },
  {
    id: 5,
    url: '/projects',
    title:'Projects',
    icon: <MdDetails/>,
  }


]