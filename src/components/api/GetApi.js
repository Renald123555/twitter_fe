import api from './HttpInit'

const getAllPosts = (filter) => {
  const call = api.get(`/post/get-all-post?filter=${filter}`)
  return call
}

const registerUser = (data) => {
  const call = api.post('/user/register', data)
  return call
}

const loginUser = (data) => {
  const call = api.post('/user/login', data)
  return call
}

const authUser = (data) => {
  const call = api.get(`/auth?token=${data}`)
  return call
}

const insertNewPost = (data) => {
  const call = api.post('/post/insert-new-post', data)
  return call
}

const updatePost = (data) => {
  const call = api.put('/post/update-post', data)
  return call
}

const deletePost = (data) => {
  const call = api.put('/post/delete-post', data)
  return call
}

export default {
  getAllPosts,
  registerUser,
  loginUser,
  authUser,
  insertNewPost,
  updatePost,
  deletePost
}
