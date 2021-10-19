import React, { useContext } from 'react'

import { SearchContext } from '../context/SearchContext'

import twitterAvatar from '../../static/image/twitterAvatar.png'

function HomeSearch() {
  const [search, setSearch] = useContext(SearchContext)

  const changeSearchData = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div id="homeSearch" className='col-3'>
      <div className='row'>
        <div className='col'>
          <div className='sticky-top bg-white'>
            <div className='pt-3 pl-3 pb-1 mb-2'>
              <div className='input-group mb-2'>
                <div className='input-group-prepend'>
                  <div className='input-group-text border-0' style={{ backgroundColor: '#f6f6f6', borderRadius: '40px 0 0 40px' }}>
                    <i className='fa fa-search' />
                  </div>
                  <input id="search" type='text' className='form-control shadow-none border-0 pl-0' placeholder='Search Twitter' style={{ outline: 'none', fontSize: '15px', backgroundColor: '#f6f6f6', borderRadius: '0 40px 40px 0' }} onChange={changeSearchData} value={search} />
                </div>
              </div>
            </div>
          </div>
          <div id="trendContainer" className='border-0 border ml-3' style={{ backgroundColor: '#f6f6f6', borderRadius: '20px' }}>
            <div>
              <div className='p-3 border-bottom'>
                <div className='font-weight-bold'>
                  Trends for you
                </div>
              </div>
              <div>
                <div className='p-3 border-bottom' style={{ fontSize: '14px' }}>
                  <div className='text-muted'>
                    Trending in Indonesia
                  </div>
                  <div className='font-weight-bold'>
                    Kangkung
                  </div>
                  <div className='text-muted'>
                    6,262 Tweets
                  </div>
                </div>
                <div className='p-3 border-bottom' style={{ fontSize: '14px' }}>
                  <div className='text-muted'>
                    Trending in Indonesia
                  </div>
                  <div className='font-weight-bold'>
                    Puput
                  </div>
                  <div className='text-muted'>
                    16K Tweets
                  </div>
                </div>
                <div className='p-3 border-bottom' style={{ fontSize: '14px' }}>
                  <div className='text-muted'>
                    Sports · Trending
                  </div>
                  <div className='font-weight-bold'>
                    Bale
                  </div>
                  <div className='text-muted'>
                    27.4K Tweets
                  </div>
                </div>
                <div className='p-3' style={{ fontSize: '14px' }}>
                  <div className='text-muted'>
                    Sports · Trending
                  </div>
                  <div className='font-weight-bold'>
                    Kevin
                  </div>
                  <div className='text-muted'>
                    164K Tweets
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="followContainer" className='border-0 border ml-3 mt-3' style={{ backgroundColor: '#f6f6f6', borderRadius: '20px' }}>
            <div>
              <div className='p-3 border-bottom'>
                <div className='font-weight-bold'>
                  Who to follow
                </div>
              </div>
              <div>
                <div className='pt-3 pb-3 border-bottom' style={{ fontSize: '14px' }}>
                  <div className='row'>
                    <div className='col-2 ml-4 pr-0 pl-0'>
                      <img src={twitterAvatar} alt='' className='border rounded-circle w-100' />
                    </div>
                    <div className='col-4'>
                      <div className='font-weight-bold'>
                        Genshin
                      </div>
                      <div className='text-muted'>
                        @Genshin
                      </div>
                    </div>
                    <div className='col-2'>
                      <div className='btn btn-outline-primary rounded-pill font-weight-bold' style={{ fontSize: '14px' }}>Follow</div>
                    </div>
                  </div>
                </div>
                <div className='pt-3 pb-3' style={{ fontSize: '14px' }}>
                  <div className='row'>
                    <div className='col-2 ml-4 pr-0 pl-0'>
                      <img src={twitterAvatar} alt='' className='border rounded-circle w-100' />
                    </div>
                    <div className='col-4'>
                      <div className='font-weight-bold'>
                        Impact
                      </div>
                      <div className='text-muted'>
                        @Impact
                      </div>
                    </div>
                    <div className='col-2'>
                      <div className='btn btn-outline-primary rounded-pill font-weight-bold' style={{ fontSize: '14px' }}>Follow</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeSearch
