import React, { useContext, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import { SearchContext } from '../context/SearchContext'
import { UserContext } from "../context/UserContext";

import twitterAvatar from '../../static/image/twitterAvatar.png'
import userEvent from '@testing-library/user-event'

function HomeSearch() {
  const [search, setSearch] = useContext(SearchContext)
  const [user, setUser] = useContext(UserContext);

  const changeSearchData = (e) => {
    setSearch(e.target.value)
  }

  const trendBody = id => {
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

  // const followBody = provided => {
  // }
  const [body, setBody] = useState(["trend"])

  const id2List = {
    droppable: 'items',
    droppable2: 'selected'
  };

  const getList = (id) => this.state[id2List[id]];

  const onDragEnd = result => {
    const { source, destination } = result;
    // result = move(
    //   this.getList(source.droppableId),
    //   this.getList(destination.droppableId),
    //   source,
    //   destination
    // );
    const items = Array.from(body);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBody(items);
  }

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'white',
    padding: 8,
    width: 250
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
          <div className="border border-black pr-3 pt-3 mt-3">
            <Droppable droppableId="homeSearch" direction="vertical">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                  {body.map((data, index) => {
                    return (<Draggable key={data} draggableId={data} index={index}>
                      {provided => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          {/* {trendBody(data)} */}
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
          <div className="border border-black pr-3 pt-3 mt-3">
            <Droppable droppableId="homeSearch2" direction="vertical">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                  {body.map((data, index) => {
                    console.log("data nih", data)
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
      </DragDropContext>
    </div>
  )
}

export default HomeSearch
