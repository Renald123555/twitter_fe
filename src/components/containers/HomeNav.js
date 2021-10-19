import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import localforage from 'localforage'

import HomeButton from '../../static/image/home-blue.png'
import TwitterLogo from '../../static/image/twitter-logo.png'
import ExploreLogo from '../../static/image/hashtag.png'
import Notification from '../../static/image/Notification.png'
import Messages from '../../static/image/messages.png'
import Bookmark from '../../static/image/bookmark.png'
import List from '../../static/image/lists.png'
import Profile from '../../static/image/profile.png'
import More from '../../static/image/more.png'

function HomeNav() {
  const [tab, setTab] = useState('home')
  const history = useHistory()

  const logoutClick = async () => {
    await localforage.removeItem('token')
    history.push('/')
  }

  return (
    <div id="homeNav" className='col-2'>
      <div className='row sticky-top'>
        <div className='col'>
          <div className='row'>
            <a>
              <div className='ml-3'>
                <img src={TwitterLogo} alt='' className='w-25' />
              </div>
            </a>
          </div>
          <a className='row p-2 text-decoration-none default-hover mt-2'>
            <div className='col-4 pr-0'>
              <img src={HomeButton} alt='' className='w-75' />
            </div>
            <div className='col-8 align-self-center'>
              <span className='font-weight-bold' style={{ color: tab === 'home' ? '#1da1f2' : 'black' }}>Home</span>
            </div>
          </a>
          <a className='row p-2 text-decoration-none default-hover mt-2'>
            <div className='col-4 pr-0'>
              <img src={ExploreLogo} alt='' className='w-75' />
            </div>
            <div className='col-8 align-self-center'>
              <span className='font-weight-bold' style={{ color: tab === 'explore' ? '#1da1f2' : 'black' }}>Explore</span>
            </div>
          </a>
          <a className='row p-2 text-decoration-none default-hover mt-2'>
            <div className='col-4 pr-0'>
              <img src={Notification} alt='' className='w-75' />
            </div>
            <div className='col-8 align-self-center'>
              <span className='font-weight-bold' style={{ color: tab === 'notifications' ? '#1da1f2' : 'black' }}>Notifications</span>
            </div>
          </a>
          <a className='row p-2 text-decoration-none default-hover mt-2'>
            <div className='col-4 pr-0'>
              <img src={Messages} alt='' className='w-75' />
            </div>
            <div className='col-8 align-self-center'>
              <span className='font-weight-bold' style={{ color: tab === 'messages' ? '#1da1f2' : 'black' }}>Messages</span>
            </div>
          </a>
          <a className='row p-2 text-decoration-none default-hover mt-2'>
            <div className='col-4 pr-0'>
              <img src={Bookmark} alt='' className='w-75' />
            </div>
            <div className='col-8 align-self-center'>
              <span className='font-weight-bold' style={{ color: tab === 'bookmarks' ? '#1da1f2' : 'black' }}>Bookmarks</span>
            </div>
          </a>
          <a className='row p-2 text-decoration-none default-hover mt-2'>
            <div className='col-4 pr-0'>
              <img src={List} alt='' className='w-75' />
            </div>
            <div className='col-8 align-self-center'>
              <span className='font-weight-bold' style={{ color: tab === 'lists' ? '#1da1f2' : 'black' }}>Lists</span>
            </div>
          </a>
          <a className='row p-2 text-decoration-none default-hover mt-2'>
            <div className='col-4 pr-0'>
              <img src={Profile} alt='' className='w-75' />
            </div>
            <div className='col-8 align-self-center'>
              <span className='font-weight-bold' style={{ color: tab === 'profile' ? '#1da1f2' : 'black' }}>Profile</span>
            </div>
          </a>
          <a className='row p-2 text-decoration-none default-hover mt-2'>
            <div className='col-4 pr-0'>
              <img src={More} alt='' className='w-75' />
            </div>
            <div className='col-8 align-self-center'>
              <span className='font-weight-bold' style={{ color: tab === 'more' ? '#1da1f2' : 'black' }}>More</span>
            </div>
          </a>
          <div className='row mt-3' style={{ width: '130%' }}>
            <div className='btn btn-primary rounded-pill font-weight-bold w-100 border-0 default-button' style={{ fontSize: '14px' }}>Tweet</div>
          </div>
          <div className='row' style={{ width: '130%' }}>
            <div id="logoutButton" className='btn btn-outline-danger rounded-pill font-weight-bold w-100 mt-3' style={{ fontSize: '14px' }} onClick={logoutClick}>Logout</div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default HomeNav
