import Food from '../models/Food.js'
import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from 'mongoose'
import moment from 'moment'
const createFood = async (req, res) => {
  const { foodName, foodId, measureOptions, measure, quantity } = req.body
  if (!foodName || !foodId || !measureOptions || !measure || !quantity) {
    throw new BadRequestError('Please provide all values')
  }
  req.body.createdBy = req.user.userId
  const food = await Food.create(req.body)

  res.status(StatusCodes.CREATED).json({ food })
}
const getAllFoods = async (req, res) => {
  const { date } = req.query
  // const newDate = new Date(date)
  const start = moment(date).startOf('day')
  const queryObject = {
    createdBy: req.user.userId,
    date: {
      $gte: start.toDate(),
      $lte: moment(start).endOf('day').toDate(),
    },
  }

  let result = Food.find(queryObject)
  const foods = await result

  res.status(StatusCodes.OK).json({ foods })
}

const updateFood = async (req, res) => {
  const { id: foodId } = req.params
  const { measure, quantity } = req.body

  if (!measure || !quantity) {
    throw new BadRequestError('Please provide all values')
  }
  const food = await Food.findOne({ _id: foodId })

  if (!food) {
    throw new NotFoundError(`No food with id :${foodId}`)
  }

  // check permissions
  checkPermissions(req.user, food.createdBy)

  const updatedJob = await Food.findOneAndUpdate({ _id: foodId }, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(StatusCodes.OK).json({ updatedJob })
}
const deleteFood = async (req, res) => {
  const { id: foodId } = req.params
  const food = await Food.findOne({ _id: foodId })
  if (!food) {
    throw new NotFoundError(`No food with id :${foodId}`)
  }
  checkPermissions(req.user, food.createdBy)
  // await food.remove()- deprecated
  await Food.deleteOne({ _id: foodId })
  res.status(StatusCodes.OK).json({ msg: 'Success! Food removed' })
}

const showStats = async (req, res) => {
  const { date } = req.query
  const start = moment(date).startOf('day')

  let stats = await Food.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
        date: {
          $gte: start.toDate(),
          $lte: moment(start).endOf('day').toDate(),
        },
      },
    },
    {
      $group: {
        _id: null,
        FIBTG: { $sum: '$nutrientObj.FIBTG.quantity' },
        CA: { $sum: '$nutrientObj.CA.quantity' },
        MG: { $sum: '$nutrientObj.MG.quantity' },
        K: { $sum: '$nutrientObj.K.quantity' },
        FE: { $sum: '$nutrientObj.FE.quantity' },
        ZN: { $sum: '$nutrientObj.ZN.quantity' },
        P: { $sum: '$nutrientObj.P.quantity' },
        VITA_RAE: { $sum: '$nutrientObj.VITA_RAE.quantity' },
        VITC: { $sum: '$nutrientObj.VITC.quantity' },
        THIA: { $sum: '$nutrientObj.THIA.quantity' },
        RIBF: { $sum: '$nutrientObj.RIBF.quantity' },
        NIA: { $sum: '$nutrientObj.NIA.quantity' },
        VITB6A: { $sum: '$nutrientObj.VITB6A.quantity' },
        FOLDFE: { $sum: '$nutrientObj.FOLDFE.quantity' },
        FOLFD: { $sum: '$nutrientObj.FOLFD.quantity' },
        VITB12: { $sum: '$nutrientObj.VITB12.quantity' },
        VITD: { $sum: '$nutrientObj.VITD.quantity' },
        TOCPHA: { $sum: '$nutrientObj.TOCPHA.quantity' },
        VITK1: { $sum: '$nutrientObj.VITK1.quantity' },
      },
    },
  ])
  stats = stats[0]

  // set defaults incase no data found
  const defaultStats = {
    CA: stats?.CA || 0,
    FE: stats?.FE || 0,
    FIBTG: stats?.FIBTG || 0,
    FOLDFE: stats?.FOLDFE || 0,
    FOLFD: stats?.FOLFD || 0,
    K: stats?.K || 0,
    MG: stats?.MG || 0,
    NIA: stats?.NIA || 0,
    P: stats?.P || 0,
    RIBF: stats?.RIBF || 0,
    THIA: stats?.THIA || 0,
    TOCPHA: stats?.TOCPHA || 0,
    VITA_RAE: stats?.VITA_RAE || 0,
    VITB6A: stats?.VITB6A || 0,
    VITB12: stats?.VITB12 || 0,
    VITC: stats?.VITC || 0,
    VITD: stats?.VITD || 0,
    VITK1: stats?.VITK1 || 0,
    ZN: stats?.ZN || 0,
  }

  res.status(StatusCodes.OK).json({ defaultStats })
  // res.status(StatusCodes.OK).json({ stats })
}

export { createFood, deleteFood, getAllFoods, updateFood, showStats }
