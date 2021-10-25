import React, { useContext, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import { SearchContext } from '../context/SearchContext'
import { UserContext } from "../context/UserContext";

import twitterAvatar from '../../static/image/twitterAvatar.png'
import userEvent from '@testing-library/user-event'

import { isEmpty } from 'lodash'


function HomeSearch() {
  const [search, setSearch] = useContext(SearchContext)
  const [user, setUser] = useContext(UserContext);

  const changeSearchData = (e) => {
    setSearch(e.target.value)
  }

  const trendBody = id => {
    if (id === "follow") {
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
    } else {
      <div></div>
    }
  }

  const trendBody2 = id => {
    if (id === "follow") {
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
    } else {
      <div></div>
    }
  }

  const [body, setBody] = useState(["follow"])
  const [body2, setBody2] = useState([])


  const move = (source, destination, droppableSource, droppableDestination) => {
    // const sourceClone = Array.from(source);
    // const destClone = Array.from(destination);
    // const [removed] = sourceClone.splice(droppableSource.index, 1);
    // destClone.splice(droppableDestination.index, 0, removed);
    if (!isEmpty(source)) {
      destination = ["follow"]
      source = []
    } else {
      source = ["follow"]
      destination = []
    }

    const result = {};
    if (isEmpty(droppableDestination)) {
      droppableDestination = { droppableId: droppableSource.droppableId, index: 0 }
    }

    result[droppableSource.droppableId] = source;
    result[droppableDestination.droppableId] = destination;
    return result;
  };

  const onDragEnd = result => {
    const e = document.getElementById("box");
    const e2 = document.getElementById("box2");
    let sourceArray = [];
    let destinationArray = [];
    if (isEmpty(e)) {
      sourceArray = ["follow"]
    } else {
      destinationArray = ["follow"];
    }
    const { source, destination } = result;
    result = move(
      // getList(source.droppableId),
      // getList(destination.droppableId),
      sourceArray,
      destinationArray,
      source,
      destination
    );
    // const items = Array.from(body);
    // const [reorderedItem] = items.splice(result.source.index, 1);
    // items.splice(result.destination.index, 0, reorderedItem);

    let keys = Object.keys(result)
    if (keys.length < 2) {
      if (keys.includes('homeSearch2')) {
        result.homeSearch = []
      } else if (keys.includes('homeSearch')) {
        result.homeSearch2 = []
      }
    }
    setBody(result.homeSearch);
    setBody2(result.homeSearch2)
  }

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'white',
    padding: 8,
    width: 250,
    height: 230
  });

  return (
    <div id="homeSearch" className='row' style={{ flexBasis: "100%" }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div >
          <div className='sticky-top bg-white'>
            <div className='pt-3 pl-3 mb-2 pb-1'>
              <div className='mb-2'>
                <div className='input-group-prepend'>
                  <div className='input-group-text border-0' style={{ backgroundColor: '#f6f6f6', borderRadius: '40px 0 0 40px' }}>
                    <i className='fa fa-search' />
                  </div>
                  <input id="search" type='text' className='form-control shadow-none border-0 pl-0' placeholder='Search Twitter' style={{ outline: 'none', fontSize: '15px', backgroundColor: '#f6f6f6', borderRadius: '0 40px 40px 0' }} onChange={changeSearchData} value={search} />
                </div>
              </div>
            </div>
          </div>
          <span className='font-weight-bold mt-2 mb-3' style={{ color: 'black' }}>React Beautiful DnD</span>
          <div id="beautifulAContainer">A</div>
          <div className="border border-black pr-3 pt-3 mb-3">
            <div id="box1">
              <Droppable droppableId="homeSearch" direction="vertical">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
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
          </div>
          <div id="beautifulBContainer">B</div>
          <div className="border border-black pr-3 pt-3">
            <div id="box2">
              <Droppable droppableId="homeSearch2" direction="vertical">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                    {body2.map((data, index) => {
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
          </div>
        </div>
      </DragDropContext>
    </div>
  )
}

export default HomeSearch
