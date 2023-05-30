import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import { Alert } from './Alert'
import Loading from './Loading'
import { SelectAmount } from './SelectAmount'
import { SingleFood } from './SingleFood'

export const AllFoods = () => {
  const { getFoods, isLoading, addedFoods, isModalOpen, showAlert, date } =
    useAppContext()
  useEffect(() => {
    getFoods()
  }, [date])
  if (isLoading) {
    return <Loading />
  }
  if (addedFoods.length < 1) {
    return (
      <section className='results'>
        <h3 className='error-message'>no results found...</h3>
      </section>
    )
  }
  return (
    <section className='foods'>
      {showAlert && <Alert />}
      {isModalOpen && <SelectAmount />}
      {addedFoods.map((item, index) => {
        return (
          <SingleFood
            //! handleClick={handleAddFood}
            // key={index}
            key={item._id}
            // key={item.id}
            item={item}
            {...item}
          />
        )
      })}
    </section>
  )
}
