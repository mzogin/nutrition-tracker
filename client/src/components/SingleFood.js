import { useAppContext } from '../context/appContext'
import { FaEdit } from 'react-icons/fa'

export const SingleFood = ({ item, _id }) => {
  const { setEditFood } = useAppContext()
  return (
    <>
      <div className='result' onClick={() => setEditFood(item)}>
        <span>
          {item.foodName.length < 28
            ? item.foodName
            : item.foodName.slice(0, 28) + '...'}
        </span>
        <span className='result-dropdown'>
          <FaEdit />
        </span>
      </div>
    </>
  )
}
