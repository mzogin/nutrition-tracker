export const Nutrient = ({ name, count, color, percent }) => {
  // console.log(name, percent)
  return (
    <div className='nutrient'>
      <div className='nutrient-label'>
        <h5>{name}</h5>
      </div>
      <div className='progress-border'>
        <div
          className='progress-bar'
          style={{
            width: percent,
            // width: `${percent >= 100 ? '100' : percent}%`,
            background: color,
          }}
        ></div>
      </div>
    </div>
  )
}
