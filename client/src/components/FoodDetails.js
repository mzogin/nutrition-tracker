import { useEffect } from 'react'
import { useAppContext } from '../context/appContext'

export const FoodDetails = () => {
  const { getDetails, measure, quantity, nutrientObj, isGettingDetails } =
    useAppContext()

  useEffect(() => {
    // if (measure && !isGettingDetails) {
    if (!isGettingDetails && quantity !== '') {
      getDetails()
      // const timerId = setTimeout(() => {
      //   getDetails()
      // }, 100)
      // return () => {
      //   clearTimeout(timerId)
      // }
    }
    // if (measure && !isGettingDetails && quantity !== '') {
    //   getDetails()
    // }
    // eslint-disable-next-line
  }, [measure, quantity])

  //! if (isGettingDetails) {
  //   return <LoadingSpinner center />
  // }

  return (
    <div className='nutrients'>
      <h5>nutrition - % daily value</h5>
      <ul>
        {Object.keys(nutrientObj).map((key, index) => {
          return (
            <li key={index}>
              <span className='green'>{nutrientObj[key].label}: </span>
              {nutrientObj[key].dailyQuantity.toFixed(2)}%
            </li>
          )
        })}
      </ul>
    </div>
  )
}
