import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'

const links = [
  // first route points to parent (dash)
  {
    id: 1,
    text: 'tracking',
    path: '/',
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: 'all foods',
    path: '/all-foods',
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: 'add food',
    path: '/search',
    icon: <FaWpforms />,
  },
  {
    id: 4,
    text: 'profile',
    path: '/profile',
    icon: <ImProfile />,
  },
]

export default links
