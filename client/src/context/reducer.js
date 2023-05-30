// import { useFetcher } from 'react-router-dom'
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
  CLOSE_MODAL,
  SET_LOADING,
  END_LOADING,
  GET_DETAILS_SUCCESS,
  GET_DETAILS_BEGIN,
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
  DELETE_FOOD_ERROR,
  DELETE_FOOD_SUCCESS,
  SHOW_STATS_SUCCESS,
  GET_NEXT_DAY,
  GET_PREV_DAY,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
} from './actions'

import { initialState } from './appContext'

export const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'please provide all values!',
    }
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    }
  }

  // ! refactor
  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      //! token: action.payload.token,
      user: action.payload.user,
      requirements: action.payload.requirements,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    }
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    }
  }

  if (action.type === LOGOUT_USER) {
    // use initial values
    return {
      ...initialState,
      userLoading: false,
      // user: null,
      // token: null,
      // jobLocation: '',
      // userLocation: '',
    }
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      // !token: action.payload.token,
      user: action.payload.user,
      requirements: action.payload.requirements,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Profile Updated!',
    }
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if (action.type === HANDLE_CHANGE) {
    // dynamic property/key
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    }
  }
  if (action.type === CLOSE_MODAL) {
    const nutrientObj = {
      CA: { label: 'calcium', quantity: 0, dailyQuantity: 0, unit: 'mg' },
      FOLDFE: {
        label: 'Folate, DFE',
        quantity: 0,
        dailyQuantity: 0,
        unit: 'µg',
      },
      FOLFD: {
        label: 'Folate, food',
        quantity: 0,
        dailyQuantity: 0,
        unit: 'µg',
      },
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
      VITA_RAE: {
        label: 'Vitamin A',
        quantity: 0,
        dailyQuantity: 0,
        unit: 'µg',
      },
      VITB6A: {
        label: 'Vitamin B-6',
        quantity: 0,
        dailyQuantity: 0,
        unit: 'mg',
      },
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
    }
    return {
      ...state,
      isModalOpen: false,
      isEditing: false,
      foodItem: null,
      quantity: 1,
      measure: '',
      nutrientObj,
    }
  }

  if (action.type === SET_ADD_FOOD) {
    return {
      ...state,
      isModalOpen: true,
      measure: action.payload.item.measures[0].label,
      measureOptions: action.payload.item.measures,
      foodId: action.payload.item.id,
      foodName: action.payload.item.name,

      //! foodItem: action.payload.item,
    }
  }
  if (action.type === SET_LOADING) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === END_LOADING) {
    return {
      ...state,
      isLoading: false,
    }
  }
  if (action.type === GET_DETAILS_BEGIN) {
    return {
      ...state,
      isGettingDetails: true,
    }
  }

  if (action.type === GET_DETAILS_ERROR) {
    return {
      ...state,
      isGettingDetails: false,
    }
  }
  if (action.type === GET_DETAILS_SUCCESS) {
    const { totalNutrients, totalDaily } = action.payload.data

    const returnObj = {}
    for (const [key, value] of Object.entries(totalNutrients)) {
      if (state.nutrientObj[key]) {
        returnObj[key] = {
          ...state.nutrientObj[key],
          quantity: value.quantity,
        }
      }
    }
    for (const [key, value] of Object.entries(totalDaily)) {
      if (state.nutrientObj[key]) {
        returnObj[key] = {
          ...returnObj[key],
          dailyQuantity: value.quantity,
        }
        // returnObj[key] = {
        //   ...state.nutrientObj[key],
        //   dailyQuantity: value.quantity,
        // }
      }
    }
    return {
      ...state,
      isGettingDetails: false,
      // nutrientObj: returnObj,
      // nutrientObj: { ...state.nutrientObj, ...returnObj },
      nutrientObj: { ...returnObj },
    }
  }

  // add food
  if (action.type === ADD_FOOD_BEGIN) {
    return {
      ...state,
      isAddingFood: true,
    }
  }
  if (action.type === ADD_FOOD_SUCCESS) {
    return {
      ...state,
      isAddingFood: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Food Added!',
    }
  }
  if (action.type === ADD_FOOD_ERROR) {
    return {
      ...state,
      isAddingFood: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if (action.type === GET_FOODS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }

  if (action.type === GET_FOODS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      addedFoods: action.payload.foods,
    }
  }
  if (action.type === GET_FOODS_ERROR) {
    return {
      ...state,
      isLoading: false,
    }
  }
  if (action.type === SET_EDIT_FOOD) {
    return {
      ...state,
      isEditing: true,
      isModalOpen: true,
      measure: action.payload.item.measure,
      measureOptions: action.payload.item.measureOptions,
      quantity: action.payload.item.quantity,
      foodId: action.payload.item.foodId,
      foodName: action.payload.item.foodName,
      editFoodId: action.payload.item._id,
    }
  }

  if (action.type === EDIT_FOOD_BEGIN) {
    return {
      ...state,
      // isEditing: true,
    }
  }

  if (action.type === EDIT_FOOD_SUCCESS) {
    return {
      ...state,
      isEditing: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Food Updated!',
    }
  }
  if (action.type === EDIT_FOOD_ERROR) {
    return {
      ...state,
      isEditing: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  if (action.type === DELETE_FOOD_BEGIN) {
    return {
      ...state,
    }
  }
  if (action.type === DELETE_FOOD_SUCCESS) {
    return {
      ...state,
      isModalOpen: false,
      // showAlert: true,
      // alertType: 'success',
      // alertText: 'Food Deleted!',
    }
  }
  if (action.type === DELETE_FOOD_ERROR) {
    return {
      ...state,
      isEditing: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      stats: action.payload.defaultStats,
      // stats: action.payload.stats,
    }
  }
  if (action.type === GET_NEXT_DAY) {
    const newDay = moment(state.date)
    newDay.add(1, 'days')
    return { ...state, date: newDay }
  }
  if (action.type === GET_PREV_DAY) {
    const newDay = moment(state.date)
    newDay.add(-1, 'days')
    return { ...state, date: newDay }
  }

  if (action.type === GET_CURRENT_USER_BEGIN) {
    return {
      ...state,
      userLoading: true,
      showAlert: false,
    }
  }
  if (action.type === GET_CURRENT_USER_SUCCESS) {
    return {
      ...state,
      userLoading: false,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
    }
  }

  throw new Error('no matching action type')
}
