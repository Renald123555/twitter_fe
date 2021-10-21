import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import HomeNav from './containers/HomeNav'
import HomePost from './containers/HomePost'
import HomeSearch from './containers/HomeSearch'

import "react-toastify/dist/ReactToastify.css";


function Home() {
  const [component, setComponent] = useState(["HomePost", "HomeSearch"])

  const listComponent = name => {
    if (name === "HomePost") {
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
    <div id="home" className='home container d-flex'>
      <div className="col-3">
        <HomeNav />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='row'>
          <Droppable droppableId="home" direction="horizontal" type="COLUMN">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps} className='d-flex'>

                {component.map((data, index) => {
                  return (<Draggable key={data} draggableId={data} index={index}>
                    {provided => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={data === "HomePost" ? "col-10" : "col-4"}>
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
