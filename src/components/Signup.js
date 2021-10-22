import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'
import localforage from 'localforage'

import GetApi from './api/GetApi'

import TwitterLogo from '../static/image/twitter-logo.png'

function Signup() {
  const [month, setMonth] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])
  const [day, setDay] = useState([])
  const [year, setYear] = useState([])
  const [values, setValues] = useState({
    name: '',
    password: '',
    phone: '',
    email: '',
    day: 'Day',
    month: 'Month',
    year: 'Year'
  })
  const [select, setSelect] = useState('phone')
  const [errorMessage, setErrorMessage] = useState('')

  const history = useHistory()

  useEffect(async () => {
    const cacheToken = await localforage.getItem('token')
    if (!_.isEmpty(cacheToken)) {
      history.push('/home')
    }
  }, [])

  useEffect(() => {
    for (let i = 1; i <= 31; i++) {
      setDay(arr => [...arr, i])
    }
    for (let i = 1901; i <= 2021; i++) {
      setYear(arr => [...arr, i])
    }
  }, [])

  const handleNameChange = (e) => {
    setValues((val) => ({
      ...val,
      name: e.target.value
    }))
  }

  const handlePasswordChange = (e) => {
    setValues((val) => ({
      ...val,
      password: e.target.value
    }))
  }

  const handlePhoneChange = (e) => {
    setValues((val) => ({
      ...val,
      phone: e.target.value
    }))
  }

  const handleEmailChange = (e) => {
    setValues((val) => ({
      ...val,
      email: e.target.value
    }))
  }

  const handleChangeClick = (value) => {
    if (value === 'email') {
      setSelect('email')
      setValues((val) => ({
        ...val,
        phone: ''
      }))
    } else if (value === 'phone') {
      setSelect('phone')
      setValues((val) => ({
        ...val,
        email: ''
      }))
    }
  }

  const handleDayChange = (e) => {
    setValues((val) => ({
      ...val,
      day: e.target.value
    }))
  }

  const handleMonthChange = (e) => {
    setValues((val) => ({
      ...val,
      month: e.target.value
    }))
  }

  const handleYearChange = (e) => {
    setValues((val) => ({
      ...val,
      year: e.target.value
    }))
  }

  const handleNextClick = async () => {
    const body = {
      name: values.name,
      password: values.password,
      email: values.email,
      phone: values.phone,
      dob: values.year + '-' + values.month + '-' + values.day
    }
    try {
      const response = await GetApi.registerUser(body)
      const res = await response.data
      if (res.message === 'Success') {
        history.push('/login')
      } else {
        setErrorMessage(res.data)
      }
    } catch (error) {
      console.log('signup error ', error)
    }
  }

  return (
    <div id="signup" className='signup vh-100' style={{ backgroundColor: '#999999' }}>
      <div className='container'>
        <div className='row'>
          <div className='col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto mt-5 text-center form mt-5 pt-1 pl-4 pr-4 pb-4 bg-white' style={{ borderRadius: '15px' }}>
            <div className='row justify-content-center'>
              <div className='col-2'>
                <img src={TwitterLogo} alt='' className='w-100' />
              </div>
            </div>
            <h4 className='py-2 text-truncate float-left ml-2 mt-4 font-weight-bold'>Create your account</h4>
            <div className='px-2'>
              <div className='justify-content-center'>
                <div className='form-group'>
                  <input id="signupName" type='email' className='form-control  shadow-none' placeholder='Name' value={values.name} onChange={handleNameChange} />
                </div>
                <div className='form-group'>
                  <input id="signupPassword" type='password' className='form-control  shadow-none' placeholder='Password' value={values.password} onChange={handlePasswordChange} />
                </div>
                {select === 'phone'
                  ? <div className='form-group'>
                    <input id="signupPhone" type='number' className='form-control shadow-none' placeholder='Phone' value={values.phone} onChange={handlePhoneChange} />
                  </div>
                  : <div className='form-group'>
                    <input id="signupEmail" type='text' className='form-control shadow-none' placeholder='Email' value={values.email} onChange={handleEmailChange} />
                  </div>}
              </div>
              <div className='row ml-1'>
                {select === 'phone'
                  ? <div id="signupUseEmail" className='py-2 text-primary' style={{ cursor: 'pointer' }} onClick={() => handleChangeClick('email')}>Use email instead</div>
                  : <div id="signupUsePhone" className='py-2 text-primary' style={{ cursor: 'pointer' }} onClick={() => handleChangeClick('phone')}>Use phone instead</div>}
              </div>
              <div className='row ml-1'>
                <div className='mt-3 font-weight-bold'>Date of Birth</div>
              </div>
              <div className='row ml-1'>
                <div className='text-muted text-left' style={{ fontSize: '14px' }}>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</div>
              </div>
              <div className='row py-2 mb-5'>
                <div className='btn-group'>
                  <select id="signupMonth" className='btn btn-outline-light dropdown-toggle border-secondary text-secondary' value={values.month} onChange={handleMonthChange}>
                    {/* <option value={values.month} default>Month</option> */}
                    {month.map((mon, i) => {
                      return (
                        <option key={mon} value={i + 1} className='dropdown-item'> {mon} </option>
                      )
                    })}
                  </select>
                </div>
                <div className='btn-group px-3'>
                  <select id="signupDay" className='btn btn-outline-light dropdown-toggle border-secondary text-secondary' value={values.day} onChange={handleDayChange}>
                    {/* <option value={values.day} default>Day</option> */}
                    {day.map(day => {
                      return (
                        <option key={day} value={day} className='dropdown-item'> {day} </option>
                      )
                    })}
                  </select>
                </div>
                <div className='btn-group'>
                  <select id="signupYear" className='btn btn-outline-light dropdown-toggle border-secondary text-secondary' value={values.year} onChange={handleYearChange}>
                    {/* <option value={values.year} default>Year</option> */}
                    {year.map(year => {
                      return (
                        <option key={year} value={year} className='dropdown-item'> {year} </option>
                      )
                    })}
                  </select>
                </div>
                <div className='row'>
                  <div className='form-group ml-4 text-danger'>
                    {!_.isEmpty(errorMessage)
                      ? <div id="errorMessageSignup">{errorMessage}</div>
                      : null}
                  </div>
                </div>
              </div>
              {!_.isEmpty(values.name) && !_.isEmpty(values.password) && (!_.isEmpty(values.phone) || !_.isEmpty(values.email))
                ? <div id="nextButtonSignup" className='btn btn-primary btn-lg rounded-pill w-100 p-1 font-weight-bold' onClick={handleNextClick}>Next</div>
                : <div id="nextButtonSignupDisabled" className='btn btn-primary btn-lg rounded-pill w-100 p-1 font-weight-bold disabled' disabled>Next</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
