import { StatusCodes } from 'http-status-codes'
import axios from 'axios'
const getResults = async (req, res) => {
  const { searchTerm } = req.query
  const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}&nutrition-type=logging&health=vegan&ingr=${searchTerm}`

  const data = await axios(url)
  const hints = data.data.hints
  res.status(StatusCodes.OK).json({ hints })
}
const getDetails = async (req, res) => {
  // console.log(req.body)
  const url = `https://api.edamam.com/api/food-database/v2/nutrients?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`

  const { data } = await axios.post(url, req.body)
  // const { data } = await axios.post(
  //   url,
  //   {
  //     ingredients: [
  //       {
  //         quantity: 1,
  //         measureURI:
  //           'http://www.edamam.com/ontologies/edamam.owl#Measure_unit',
  //         foodId: 'food_a269ixea1yf51xbfwgnq2boiwc7x',
  //       },
  //     ],
  //   }
  //   // {
  //   //   headers: { 'Content-Type': 'application/json' },
  //   // }
  // )

  res.status(StatusCodes.OK).send(data)
  // res.status(StatusCodes.OK).send({ data })
}

export { getResults, getDetails }
