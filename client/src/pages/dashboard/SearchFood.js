import React from 'react'
import SearchList from '../../components/SearchList'
import { SearchForm } from '../../components/SearchForm'
import Wrapper from '../../assets/wrappers/SearchFood'
import { useAppContext } from '../../context/appContext'
import { Alert } from '../../components'
import { DateSlider } from '../../components/DateSlider'

export const SearchFood = () => {
  const { showAlert } = useAppContext()
  return (
    <Wrapper>
      <DateSlider />
      <section className='search'>
        {showAlert && <Alert />}
        <SearchForm />
        <SearchList />
      </section>
    </Wrapper>
  )
}
