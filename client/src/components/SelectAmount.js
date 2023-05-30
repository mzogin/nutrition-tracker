import React, { useMemo, useState } from 'react'
import { useRef, useEffect } from 'react'
import Wrapper from '../assets/wrappers/SelectAmount'
import { useAppContext } from '../context/appContext'
import { Alert } from '../components'
import { FoodDetails } from './FoodDetails'
import { FaTimes } from 'react-icons/fa'

// custom hook
function useDetectClickOutside(ref, close) {
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        // close popup
        close()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, close])
  // !! ADDED CLOSE
}

// export const SelectAmount = ({ id, name, measures }) => {
export const SelectAmount = () => {
  // export const SelectAmount = ({ id, name, measures, closeModal }) => {
  const {
    foodName,
    measure,
    measureOptions,
    quantity,
    handleChange,
    closeModal,
    isLoading,
    isGettingDetails,
    isAddingFood,
    isEditing,
    addFood,
    editFood,
    showAlert,
    displayAlert,
    deleteFood,
  } = useAppContext()
  const [localQuantity, setLocalQuantity] = useState(quantity)

  const wrapperRef = useRef(null)
  // close on click outside
  useDetectClickOutside(wrapperRef, closeModal)

  // !useEffect(() => {
  //   handleChange({ name: 'measure', value: measures[0].label })
  // }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!quantity || !measure) {
      displayAlert()
      return
    }
    if (isEditing) {
      editFood()
      return
    }
    addFood()
  }
  const handleInput = (e) => {
    // pass the name + value of the event
    // will dispatch and update associated state values
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }
  // use debounce for quantity input to delay getDetails request
  const debounce = () => {
    // runs only once
    let timeoutID
    return (e) => {
      setLocalQuantity(e.target.value)
      clearTimeout(timeoutID)
      // timeout for the next time invoked
      timeoutID = setTimeout(() => {
        // waits till 1 sec after last key stroke
        handleChange({ name: e.target.name, value: e.target.value })
      }, 1000)
    }
  }
  const optimizedDebounce = useMemo(() => debounce(), [])

  return (
    <Wrapper>
      <div ref={wrapperRef} className='select-amount'>
        <div className='btn-container'>
          <button type='button' className='close-btn' onClick={closeModal}>
            <FaTimes />
          </button>
        </div>
        {/* <form className='form' onSubmit={handleSubmit}> */}
        {/* <form onSubmit={handleSubmit}> */}
        <div className='food-description'>
          <h4>{foodName}</h4>
          {/* <h4>{name}</h4> */}
        </div>
        {showAlert && <Alert />}
        <div className='food-details'>
          <div className='serving'>
            <label htmlFor='measure'>measure:</label>
            <select
              name='measure'
              // name='serving'
              id='measure'
              // id='serving'
              value={measure}
              onChange={handleInput}
            >
              {measureOptions.map((measure) => {
                return (
                  <option key={measure.uri} value={measure.label}>
                    {measure.label}
                  </option>
                )
              })}
            </select>
          </div>
          <div className='quantity'>
            <label htmlFor='quantity'>quantity:</label>
            <input
              type='number'
              id='quantity'
              name='quantity'
              min='1'
              value={localQuantity}
              // !value={quantity}
              onChange={optimizedDebounce}
              // onChange={handleInput}
            />
          </div>
        </div>
        <div className='btns-container'>
          {isEditing && (
            <button
              className='btn delete-btn'
              // onClick={addFood}
              onClick={deleteFood}
              // type='submit'
              disabled={isGettingDetails || isAddingFood}
            >
              remove
            </button>
          )}
          <button
            className='btn'
            onClick={handleSubmit}
            // type='submit'
            disabled={isGettingDetails || isAddingFood}
          >
            {/* add */}
            {isEditing ? 'save' : 'add'}
            {/* {isAddingFood ? 'Please wait...' : 'add'} */}
          </button>
        </div>
        {/* </form> */}
        {!isLoading && <FoodDetails />}
      </div>
      {/* {measure && <FoodDetails />} */}
    </Wrapper>
  )
}
