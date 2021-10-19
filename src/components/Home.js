import React from 'react'

import HomeNav from './containers/HomeNav'
import HomePost from './containers/HomePost'
import HomeSearch from './containers/HomeSearch'

import "react-toastify/dist/ReactToastify.css";


function Home() {
  return (
    <div id="home" className='home container'>
      <div className='row'>
        <HomeNav />
        <HomePost />
        <HomeSearch />
      </div>
    </div>
  )
}

export default Home
