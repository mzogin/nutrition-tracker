import React, { useState, useContext, useReducer, useEffect } from 'react'
import { reducer } from './reducer'
import axios from 'axios'
import moment from 'moment'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  SET_ADD_FOOD,
  SET_LOADING,
  CLOSE_MODAL,
  END_LOADING,
  GET_DETAILS_BEGIN,
  GET_DETAILS_SUCCESS,
  GET_DETAILS_ERROR,
  ADD_FOOD_BEGIN,
  ADD_FOOD_SUCCESS,
  ADD_FOOD_ERROR,
  GET_FOODS_BEGIN,
  GET_FOODS_SUCCESS,
  GET_FOODS_ERROR,
  SET_EDIT_FOOD,
  EDIT_FOOD_BEGIN,
  EDIT_FOOD_SUCCESS,
  EDIT_FOOD_ERROR,
  DELETE_FOOD_BEGIN,
  DELETE_FOOD_SUCCESS,
  DELETE_FOOD_ERROR,
  SHOW_STATS_SUCCESS,
  GET_NEXT_DAY,
  GET_PREV_DAY,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
} from './actions'

const measureURL = 'http://www.edamam.com/ontologies/edamam.owl#Measure_'

const initialState = {
  // set userLoading by default! otherwise user will be logged out by the time its changed in reducer
  userLoading: true,
  isLoading: false,
  isGettingDetails: false,
  isAddingFood: false,
  isEditing: false,
  showAlert: false,
  isModalOpen: false,
  alertText: '',
  alertType: '',
  user: null,
  requirements: null,
  showSidebar: false,
  // for nutrition search
  addedFoods: [],
  stats: {},
  foodId: '',
  editFoodId: '',
  quantity: 1,
  measureURI: '',
  foodName: '',
  measureOptions: [],
  measure: '',
  sexOptions: ['male', 'female'],
  nutrientObj: {
    CA: { label: 'calcium', quantity: 0, dailyQuantity: 0, unit: 'mg' },
    FOLDFE: { label: 'Folate, DFE', quantity: 0, dailyQuantity: 0, unit: 'µg' },
    FOLFD: { label: 'Folate, food', quantity: 0, dailyQuantity: 0, unit: 'µg' },
    K: { label: 'Potassium, K', quantity: 0, dailyQuantity: 0, unit: 'mg' },
    MG: { label: 'Magnesium, Mg', quantity: 0, dailyQuantity: 0, unit: 'mg' },
    // ENERC_KCAL: 0,
    FE: { label: 'Iron', quantity: 0, dailyQuantity: 0, unit: 'mg' },
    FIBTG: { label: 'Fiber', quantity: 0, dailyQuantity: 0, unit: 'g' },
    NIA: { label: 'Niacin', quantity: 0, dailyQuantity: 0, unit: 'mg' },
    P: { label: 'Phosphorus', quantity: 0, dailyQuantity: 0, unit: 'mg' },
    RIBF: { label: 'Riboflavin', quantity: 0, dailyQuantity: 0, unit: 'mg' },
    THIA: { label: 'Thiamin', quantity: 0, dailyQuantity: 0, unit: 'mg' },
    TOCPHA: { label: 'Vitamin E', quantity: 0, dailyQuantity: 0, unit: 'mg' },
    VITA_RAE: { label: 'Vitamin A', quantity: 0, dailyQuantity: 0, unit: 'µg' },
    VITB6A: { label: 'Vitamin B-6', quantity: 0, dailyQuantity: 0, unit: 'mg' },
    VITB12: {
      label: 'Vitamin B-12',
      quantity: 0,
      dailyQuantity: 0,
      unit: 'µg',
    },
    VITC: { label: 'Vitamin C', quantity: 0, dailyQuantity: 0, unit: 'mg' },
    VITD: { label: 'Vitamin D', quantity: 0, dailyQuantity: 0, unit: 'µg' },
    VITK1: { label: 'Vitamin K', quantity: 0, dailyQuantity: 0, unit: 'µg' },
    ZN: { label: 'Zinc', quantity: 0, dailyQuantity: 0, unit: 'mg' },
  },
  date: moment(),
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  //! const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('a')
  const [foods, setFoods] = useState([])

  // axios (custom instance)
  const authFetch = axios.create({
    baseURL: '/api/v1',
  })

  // response
  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        // log user out if unauthorized
        logoutUser()
      }
      return Promise.reject(error)
    }
  )

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  // SETUP USER
  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      // goes to backend - only want the data from the response
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
      const { user, requirements } = data

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, requirements, alertText },
      })
    } catch (error) {
      //! console.log(error.response)
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    // hide alert after showing it
    clearAlert()
  }

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }
  const logoutUser = async () => {
    await authFetch.get('/auth/logout')
    dispatch({ type: LOGOUT_USER })
  }

  const setLoading = () => {
    dispatch({ type: SET_LOADING })
  }
  const endLoading = () => {
    dispatch({ type: END_LOADING })
  }
  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL })
  }
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)
      const { user, requirements } = data

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, requirements },
      })
    } catch (error) {
      // no need to trigger alert if unauth error
      // (since theres a delay to remove it after logging user out)
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        })
      }
    }
    clearAlert()
  }

  // global handle change funct, handles any input update in add job page
  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }

  // ! refactor
  const fetchFoods = async () => {
    setLoading()
    try {
      // goes to backend - only want the data from the response
      const { data } = await axios.get('/api/v1/external/getResults', {
        params: {
          searchTerm: searchTerm,
        },
      })
      const { hints } = data
      if (hints) {
        const newFoods = hints.map((item) => {
          const { measures } = item
          const { foodId, label } = item.food
          return {
            id: foodId,
            name: label,
            measures,
          }
        })
        setFoods(newFoods)
      } else {
        setFoods([])
      }
      endLoading()
    } catch (error) {
      endLoading()
    }
  }

  const setAddFood = (item) => {
    dispatch({ type: SET_ADD_FOOD, payload: { item } })
  }

  const getDetails = async () => {
    let uri = measureURL

    if (state.measure === 'Whole') {
      uri = uri + 'unit'
    } else if (state.measure === 'Fluid ounce') {
      uri = uri + 'fluid_ounce'
    } else {
      uri = uri + state.measure.toLowerCase()
    }
    dispatch({ type: GET_DETAILS_BEGIN })
    try {
      const { data } = await axios.post('/api/v1/external/getDetails', {
        ingredients: [
          {
            quantity: Number(state.quantity),
            measureURI: uri,
            foodId: state.foodId,
          },
        ],
      })

      dispatch({ type: GET_DETAILS_SUCCESS, payload: { data } })
    } catch (error) {
      dispatch({ type: GET_DETAILS_ERROR })
    }
  }

  const addFood = async () => {
    dispatch({ type: ADD_FOOD_BEGIN })
    try {
      const {
        foodId,
        foodName,
        measure,
        measureOptions,
        quantity,
        nutrientObj,
        date,
      } = state

      // dont need to return anything from req, just add new job to DB
      await authFetch.post('/foods', {
        foodId,
        foodName,
        measure,
        measureOptions,
        quantity,
        nutrientObj,
        date,
      })
      dispatch({ type: ADD_FOOD_SUCCESS })
      closeModal()
      setSearchTerm('a')
      // dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      // dont display alert for unauth
      if (error.response.status === 401) return
      // ! check this
      closeModal()
      dispatch({
        type: ADD_FOOD_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const getFoods = async () => {
    const { date } = state
    dispatch({ type: GET_FOODS_BEGIN })
    try {
      const { data } = await authFetch(`/foods?date=${date.toISOString()}`)
      const { foods } = data
      dispatch({ type: GET_FOODS_SUCCESS, payload: { foods } })
    } catch (error) {
      dispatch({ type: GET_FOODS_ERROR })
    }
  }
  const setEditFood = (item) => {
    dispatch({ type: SET_EDIT_FOOD, payload: { item } })
  }
  const editFood = async () => {
    dispatch({ type: EDIT_FOOD_BEGIN })
    try {
      const { measure, quantity, measureOptions, nutrientObj } = state
      await authFetch.patch(`/foods/${state.editFoodId}`, {
        measure,
        quantity,
        measureOptions,
        nutrientObj,
      })

      dispatch({ type: EDIT_FOOD_SUCCESS })
      closeModal()
      // ! clear values
    } catch (error) {
      // if unauth, interceptor will handle user logout
      if (error.response.status === 401) return
      dispatch({
        type: EDIT_FOOD_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const deleteFood = async () => {
    dispatch({ type: DELETE_FOOD_BEGIN })
    try {
      // send del req with id in params
      await authFetch.delete(`/foods/${state.editFoodId}`)
      dispatch({ type: DELETE_FOOD_SUCCESS })
      getFoods()
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: DELETE_FOOD_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const showStats = async () => {
    const { date } = state
    // dispatch({ type: SHOW_STATS_BEGIN })
    try {
      const { data } = await authFetch(`/foods/stats?date=${date}`)
      const { defaultStats } = data

      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          defaultStats,
        },
      })
    } catch (error) {
      logoutUser()
    }
    // in case theres alert component on the page(technically dont need to)
    clearAlert()
  }

  const getNextDay = () => {
    dispatch({ type: GET_NEXT_DAY })
  }

  const getPrevDay = () => {
    dispatch({ type: GET_PREV_DAY })
  }

  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN })
    try {
      const { data } = await authFetch('/auth/getCurrentUser')
      const { user, location } = data
      dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: { user, location } })
    } catch (error) {
      // technically err will be handled in interceptor anyways
      if (error.response.status === 401) return
      logoutUser()
    }
  }

  // get user details on load and every refresh
  useEffect(() => {
    getCurrentUser()
    // eslint-disable-next-line
  }, [])
  return (
    <AppContext.Provider
      value={{
        ...state,
        // loading,
        foods,
        searchTerm,
        closeModal,
        setSearchTerm,
        setAddFood,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        getDetails,
        fetchFoods,
        addFood,
        getFoods,
        setEditFood,
        editFood,
        deleteFood,
        showStats,
        getNextDay,
        getPrevDay,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
