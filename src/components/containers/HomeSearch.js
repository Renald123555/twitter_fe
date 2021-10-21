import React, { useContext, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import { SearchContext } from '../context/SearchContext'

import twitterAvatar from '../../static/image/twitterAvatar.png'

function HomeSearch() {
  const [search, setSearch] = useContext(SearchContext)

  const changeSearchData = (e) => {
    setSearch(e.target.value)
  }

  const trendBody = id => {
    if (id === "trend") {
      return (<div id="trendContainer" className='border-0 border ml-3 mb-4' style={{ backgroundColor: '#f6f6f6', borderRadius: '20px' }}>
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
      </div>)
    } else {
      return (
        <div id="followContainer" className='border-0 border ml-3 mb-4' style={{ backgroundColor: '#f6f6f6', borderRadius: '20px' }}>
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
      )
    }
  }

  // const followBody = provided => {
  // }
  const [body, setBody] = useState(["trend", "follow"])

  const onDragEnd = result => {
    const items = Array.from(body);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBody(items);
  }

  return (
    <div id="homeSearch" className='' style={{ flexBasis: "100%" }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='row'>
          <div className='sticky-top bg-white'>
            <div className='pt-3 pl-3 mb-2 pb-1'>
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
          <Droppable droppableId="homeSearch" direction="vertical">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {body.map((data, index) => {
                  return (<Draggable key={data} draggableId={data} index={index}>
                    {provided => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        {trendBody(data)}
                      </div>
                    )}
                  </Draggable>
                  )
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

        </div>
      </DragDropContext>
    </div>
  )
}

export default HomeSearch
