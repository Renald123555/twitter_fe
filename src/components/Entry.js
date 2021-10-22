import React from 'react'
import { Link } from 'react-router-dom'

import EntryImg from '../static/image/entry.png'

import TwitterLogo from '../static/image/twitter-logo.png'

function Entry() {
  return (
    <div id="entry" className='entry row mr-0'>
      <div className='col-6 pr-0'>
        <div style={{ height: '95vh' }}>
          <img src={EntryImg} alt='' className='w-100 h-100' />
        </div>
      </div>
      <div className='col-6'>
        <div style={{ height: '92vh' }}>
          <div className='p-3 mt-3'>
            <div className='mt-5'>
              <div className='row'>
                <div className='col-2 mt-5'>
                  <img src={TwitterLogo} alt='' className='w-75' />
                </div>
              </div>
              <div className='row p-3'>
                <div className='font-weight-bold' style={{ fontSize: '54px' }}>Happening now</div>
              </div>
              <div className='row p-3'>
                <div className='font-weight-bold h3'>Join Twitter today.</div>
              </div>
              <div className='row p-2'>
                <div className='w-50'>
                  <Link to='/signup'>
                    <div id="signupEntry" className='btn btn-primary rounded-pill w-100 font-weight-bold'>
                      Sign up
                    </div>
                  </Link>
                </div>
              </div>
              <div className='row p-2'>
                <div className='w-50'>
                  <Link to='/login'>
                    <div id="loginEntry" className='btn btn-outline-primary rounded-pill w-100 font-weight-bold'>
                      Log in
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Entry
