import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import HomeNav from './containers/HomeNav'
import HomePost from './containers/HomePost'
import HomeSearch from './containers/HomeSearch'

import "react-toastify/dist/ReactToastify.css";


function Home() {
  const [component, setComponent] = useState(["HomeNav", "HomePost", "HomeSearch"])

  const listComponent = name => {
    if (name === "HomeNav") {
      return <HomeNav />
    } else if (name === "HomePost") {
      return <HomePost />
    } else {
      return <HomeSearch />
    }
  }

  const onDragEnd = result => {
    const items = Array.from(component);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setComponent(items);
  }

  return (
    <div id="home" className='home container'>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='row'>
          <Droppable droppableId="home" direction="horizontal" type="COLUMN">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps} className='d-flex'>
                {component.map((data, index) => {
                  return (<Draggable key={data} draggableId={data} index={index}>
                    {provided => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        {listComponent(data)}
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

export default Home
