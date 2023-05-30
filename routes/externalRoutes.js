import express from 'express'
const router = express.Router()

import { getResults, getDetails } from '../controllers/externalController.js'

router.route('/getResults').get(getResults)
router.route('/getDetails').post(getDetails)

export default router
