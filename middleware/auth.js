import jwt from 'jsonwebtoken'
import { UnAuthenticatedError } from '../errors/index.js'

const auth = async (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    throw new UnAuthenticatedError('Authentication Invalid')
  }
  //! const authHeader = req.headers.authorization
  // if (!authHeader || !authHeader.startsWith('Bearer')) {
  //   throw new UnAuthenticatedError('Authentication Invalid')
  // }
  // const token = authHeader.split(' ')[1]

  try {
    // get user's id from the JWT
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // req.user = payload
    const testUser = payload.userId === '6473f20ad2fced42150260c4'
    req.user = { userId: payload.userId, testUser }
    next()
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid')
  }
}

export default auth
