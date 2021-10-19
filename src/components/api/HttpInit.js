import config from '../../config'
import axios from 'axios'

const baseApi = config.baseAPI

export default axios.create({
  baseURL: baseApi
})
