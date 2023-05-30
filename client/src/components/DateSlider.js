import Wrapper from '../assets/wrappers/DateSlider'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'

export const DateSlider = () => {
  const { date, getNextDay, getPrevDay } = useAppContext()
  const dateStr = date.format('ddd, MMM DD')

  return (
    <Wrapper>
      <div className='slider'>
        <button onClick={getPrevDay} className='btn prev-date'>
          <FaChevronLeft />
        </button>
        <h4 className='date'>{dateStr}</h4>
        <button onClick={getNextDay} className='btn next-date'>
          <FaChevronRight />
        </button>
      </div>
    </Wrapper>
  )
}
