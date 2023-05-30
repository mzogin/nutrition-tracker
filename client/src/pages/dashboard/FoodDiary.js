import React from 'react'
import Wrapper from '../../assets/wrappers/SearchFood'
import { AllFoods, DateSlider } from '../../components'

export const FoodDiary = () => {
  return (
    <Wrapper>
      <DateSlider />
      <AllFoods />
    </Wrapper>
  )
}
