import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
// import { useGlobalContext } from '../context/appContext'

export const SearchForm = () => {
  const { setSearchTerm } = useAppContext()
  const searchValue = React.useRef('')

  useEffect(() => {
    searchValue.current.focus()
  }, [])

  function searchFood() {
    setSearchTerm(searchValue.current.value)
  }
  // function handleSubmit(e) {
  //   e.preventDefault()
  // }

  return (
    // <form className='form' onSubmit={handleSubmit}>
    <form className='form'>
      <input
        type='text'
        name='name'
        id='name'
        className='search'
        placeholder='add food'
        ref={searchValue}
        onChange={searchFood}
      />
    </form>
  )
}
