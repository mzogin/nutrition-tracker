import { useState } from 'react'
import { FormRow, Alert, FormRowSelect } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

export const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading, sexOptions } =
    useAppContext()
  // grab local state from global user object
  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [age, setAge] = useState(user?.age)
  const [height, setHeight] = useState(user?.height)
  const [weight, setWeight] = useState(user?.weight)
  const [sex, setSex] = useState(user?.sex)

  const handleSubmit = (e) => {
    e.preventDefault()
    // remove while testing
    if (!name || !email || !height || !weight) {
      displayAlert()
      return
    }
    updateUser({ name, email, age, height, weight, sex })
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* technically dont need name attr value unlike in register */}
          <FormRow
            type='text'
            name='name'
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type='email'
            name='email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type='number'
            // labelText='age'
            min='1'
            max='150'
            name='age'
            value={age}
            handleChange={(e) => setAge(e.target.value)}
          />
          <FormRow
            type='number'
            labelText='height(cm)'
            min='1'
            max='300'
            name='height'
            value={height}
            handleChange={(e) => setHeight(e.target.value)}
          />
          <FormRow
            type='number'
            labelText='weight(kg)'
            min='1'
            max='300'
            name='weight'
            value={weight}
            handleChange={(e) => setWeight(e.target.value)}
          />
          <FormRowSelect
            labelText='sex'
            name='sex'
            value={sex}
            handleChange={(e) => setSex(e.target.value)}
            list={sexOptions}
          />
          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please wait...' : 'save changes'}
          </button>
        </div>
        {/* <div className='container'>
          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please wait...' : 'save changes'}
          </button>
        </div> */}
      </form>
    </Wrapper>
  )
}
