import React, { useState, createContext } from 'react'

// const initialPostState = [{
//   id: '',
//   user_id: '',
//   image: null,
//   text: null,
//   created_at: '',
//   reply_id: null,
//   likes: null,
//   retweet: null,
//   status: null,
//   updated_at: null
// }]
export const PostContext = createContext({})

export const PostContextProvider = props => {
  const [post, setPost] = useState([])

  return (
    <PostContext.Provider value={[post, setPost]}>
      {props.children}
    </PostContext.Provider>
  )
}
