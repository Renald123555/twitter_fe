import React from 'react'

import HomeNav from './containers/HomeNav'
import HomePost from './containers/HomePost'
import HomeSearch from './containers/HomeSearch'

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
