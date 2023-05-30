// need response to attach cookie to it
const attachCookies = ({ res, token }) => {
  const oneDay = 1000 * 60 * 60 * 24
  // dont need to return, auto added to response
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
  })
}

export default attachCookies
