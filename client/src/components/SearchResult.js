import React from 'react'
import { useAppContext } from '../context/appContext'
import { FaChevronDown } from 'react-icons/fa'
export default function SearchResult({ item, name }) {
  const { setAddFood } = useAppContext()
  // export default function SearchResult(id, name, measures) {
  // onClick = { handleAddFood }
  // const [showModal, setShowModal] = useState(false)
  // const handleAddFood = () => {
  //   setShowModal(true)
  // }
  return (
    <>
      {/* {showModal && (
        <SelectAmount
          id={id}
          name={name}
          measures={measures}
          // closeModal={closeModal}
          // modalContent={state.modalContent}
        />
      )} */}
      {/* onClick={handleAddFood} */}
      {/* <div onClick={() => handleClick(item)} className='result'> */}
      <div onClick={() => setAddFood(item)} className='result'>
        <span>{name.length < 28 ? name : name.slice(0, 28) + '...'}</span>
        <span className='result-dropdown'>
          {/* {measures[0].label} */}
          {/* {measures[0].weight} */}
          <FaChevronDown />
        </span>
      </div>
    </>
  )
}
