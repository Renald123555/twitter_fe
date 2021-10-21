import React, { useEffect, useContext, useState } from 'react'
import { withRouter, Route, useHistory } from 'react-router-dom'
import localforage from 'localforage'
import _ from 'lodash'

import GetApi from './api/GetApi'
import { UserContext } from './context/UserContext'

function PrivateRoute({ component: Component, ...rest }) {
  const [user, setUser] = useContext(UserContext)
  const history = useHistory()

  useEffect(() => {
    getUserToken()
  }, [history])

  const getUserToken = async () => {
    const cacheToken = await localforage.getItem('token')
    if (!_.isEmpty(cacheToken)) {
      //   console.log('token cache', cacheToken)
      const response = await GetApi.authUser(cacheToken)
      const res = await response.data
      if (res.message === 'Success') {
        setUser(res.data)
      } else {
        history.push('/')
      }
    } else {
      history.push('/')
    }
  }

  return (
    <Route
      {...rest} render={
        props => <Component {...rest} {...props} />
      }
    />
  )
}

export default withRouter(PrivateRoute)
