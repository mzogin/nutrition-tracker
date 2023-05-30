import SearchResult from './SearchResult'
import Loading from './Loading'
// import React from 'react'
import { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import { SelectAmount } from './SelectAmount'
// import { reducer } from '../context/reducer'

export default function SearchList() {
  const { foods, isLoading, isModalOpen, fetchFoods, searchTerm } =
    useAppContext()
  // const { foods, loading, isModalOpen, foodItem } = useAppContext()
  // const [showModal, setShowModal] = useState(false)
  // const [state, dispatch] = useReducer(reducer, defaultState)

  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchFoods()
    }, 700)
    return () => {
      clearTimeout(timerId)
    }
    // eslint-disable-next-line
  }, [searchTerm])

  if (isLoading) {
    return <Loading />
  }
  if (foods.length < 1) {
    return (
      <section className='results'>
        <h3 className='error-message'>no results found</h3>
      </section>
    )
  }
  // const handleAddFood = (item) => {
  //   // setAddFood({ item })
  //   dispatch({ type: 'ADD_ITEM', payload: item })
  // }
  // const closeModal = () => {
  //   dispatch({ type: 'CLOSE_MODAL' })
  // }
  return (
    <section className='results'>
      {/* {state.isModalOpen && ( */}
      {isModalOpen && (
        <SelectAmount
        //! id={foodItem.id}
        // name={foodItem.name}
        // measures={foodItem.measures}

        // id={state.item.id}
        // name={state.item.name}
        // measures={state.item.measures}
        // closeModal={closeModal}
        // modalContent={state.modalContent}
        />
      )}
      {foods.map((item, index) => {
        // on click show popup here?
        return (
          <SearchResult
            //! handleClick={handleAddFood}
            key={index}
            // key={item.id}
            item={item}
            {...item}
          />
        )
      })}
    </section>
    // <section className='section'>
    //   <h2 className='section-title'>foods</h2>
    //   <div className='foods-center'>
    //     {foods.map((item) => {
    //       return <Cocktail key={item.id} {...item} />
    //     })}
    //   </div>
    // </section>
  )
}
