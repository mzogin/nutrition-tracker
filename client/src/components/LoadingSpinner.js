const LoadingSpinner = ({ center }) => {
  // center spinner if center prop is passed
  return <div className={center ? 'loading loading-center' : 'loading'}></div>
}

export default LoadingSpinner
