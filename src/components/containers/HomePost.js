import React, { useContext, useEffect, useState, useRef } from 'react'
import { Button, Modal } from 'react-bootstrap';

import { useHistory } from 'react-router-dom'
import _ from 'lodash'
import moment from 'moment'

import GetApi from '../api/GetApi'
import { PostContext } from '../context/PostContext'
import { UserContext } from '../context/UserContext'
import { SearchContext } from '../context/SearchContext'
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";



import twitterAvatar from '../../static/image/twitterAvatar.png'
import Image from '../../static/image/image.png'
import Gif from '../../static/image/gif.png'
import Poll from '../../static/image/poll.png'
import Smiley from '../../static/image/smiley.png'
import Calendar from '../../static/image/calendar.png'
import Reply from '../../static/image/reply.png'
import Retweet from '../../static/image/retweet.png'
import Like from '../../static/image/like.png'
import Trash from '../../static/image/trash.png'
import More from '../../static/image/more.png'

function HomePost() {
  const [post, setPost] = useContext(PostContext)
  const [user, setUser] = useContext(UserContext)
  const [search, setSearch] = useContext(SearchContext)
  const [values, setValues] = useState({
    text: '',
    imagePreview: '',
    image: ''
  })
  const [edit, setEdit] = useState({
    id: '',
    isEdit: false
  })
  const [editData, setEditData] = useState({
    id: '',
    user_id: '',
    text: '',
    image: ''
  })
  const [category, setCategory] = useState("Entertainment");
  const [isAds, setAds] = useState(false);
  const [isCommercial, setCommercial] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const inputFile = useRef(null)
  const history = useHistory()
  useEffect(() => {
    getAllPosts()
  }, [])

  const getAllPosts = async () => {
    try {
      const response = await GetApi.getAllPosts('DESC')
      const res = await response.data.data
      setPost(res)
    } catch (error) {
      console.log(error)
    }
  }

  const handleTextChange = (e) => {
    setValues((val) => ({
      ...val,
      text: e.target.value
    }))
  }

  const onImageClick = () => {
    inputFile.current.click()
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const files = new FormData()
      files.append('file', e.target.files[0])
      setValues((val) => ({
        ...val,
        imagePreview: URL.createObjectURL(e.target.files[0]),
        image: files
      }))
    }
  }

  const editClick = (data) => {
    setEdit((val) => ({
      ...val,
      id: data.id,
      isEdit: true
    }))
    setEditData((val) => ({
      ...val,
      user_id: data.id_user,
      id: data.id,
      text: data.text,
      image: data.image
    }))
  }

  const handleEditDataChange = (e) => {
    setEditData((val) => ({
      ...val,
      text: e.target.value
    }))
  }

  const insertNewPost = async () => {
    const body = {
      user_id: user.id,
      image: values.image,
      text: values.text,
      reply_id: null,
      category,
      isAds,
      isCommercial,
      dateInput: date,
    }
    const response = await GetApi.insertNewPost(body)
    const res = await response.data
    if (res.message === 'Success') {
      toast.success("Tweet Posted", {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "colored",
      })
      const response = await GetApi.getAllPosts('DESC')
      const res = await response.data.data
      setPost(res)
      setValues({ text: '', images: '', imagePreview: '' })
      setCategory("Entertainment")
      setAds(false)
      setCommercial(false)
      setDate(moment().format("YYYY-MM-DD"))
    }
  }

  const updateData = async () => {
    showEditToast();
    const body = {
      id: editData.id,
      text: editData.text,
      image: editData.image
    }
    const response = await GetApi.updatePost(body)
    const res = await response.data
    if (res.message === 'Success') {
      setEdit({ isEdit: false })
      const response = await GetApi.getAllPosts('DESC')
      const res = await response.data.data
      setPost(res)
    }
  }

  const deleteData = (id) => {
    setDeleteId(id)
    handleShow();
  }

  const setGetData = async (filter) => {
    const response = await GetApi.getAllPosts(filter)
    const res = await response.data.data
    setPost(res)
  }

  const onEntChanged = (e) => {
    setCategory("Entertainment");
  };

  const onNewsChanged = (e) => {
    setCategory("News");
  };

  const onAdsChanged = (e) => {
    setAds(!isAds);
  };
  const onCommercialChanged = (e) => {
    setCommercial(!isCommercial);
  };
  const onDateChanged = (e) => {
    setDate(e.target.value);
  };

  const showEditToast = () =>
    toast.success("Edited Data Saved", {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "colored",
    });

  const showDeleteToast = () =>
    toast.error("Data Deleted", {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "colored",
    });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleCloseAccepted = async (id) => {
    showDeleteToast();
    setShow(false)
    const body = {
      id: id
    }
    const response = await GetApi.deletePost(body)
    const res = await response.data
    if (res.message === 'Success') {
      const response = await GetApi.getAllPosts('DESC')
      const res = await response.data.data
      setPost(res)
    }
  };
  const handleShow = () => setShow(true);

  const bodyData = (data) => {
    const now = moment(new Date())
    const end = moment(data.created_at)
    const duration = moment.duration(now.diff(end)).abs()
    let dur = parseInt(duration.asHours())
    let key = 'h'
    if (dur === 0) {
      dur = parseInt(duration.asMinutes())
      key = 'm'
    }

    return (
      <div id={"postNo" + data.id} className='postData row pt-3 pb-2 border-bottom' key={data.id}>
        <div className='col-2'>
          <div>
            <img src={twitterAvatar} alt='' className='border rounded-circle w-75' style={{ cursor: 'pointer' }} />
          </div>
        </div>
        <div className='col-8 pl-0 pr-0'>
          <div className='row' style={{ fontSize: '15px' }}>
            <span className='postName font-weight-bold'>
              {data.name}
            </span>
            <span className='postUsername ml-1 text-muted'>
              @{data.username}
            </span>
            <span className='ml-2 text-muted'>
              ·
            </span>
            <span className='postDuration ml-2 text-muted'>
              {dur}{key}
            </span>
            <span className='ml-2 text-muted'>
              ·
            </span>
            <span className='postCategory ml-1 text-muted'>
              {data.category}
            </span>
            <span className=' ml-1 text-muted'>
              {data.isAds ? "· " : ""}
            </span>
            <span className='postIsAds ml-1 text-muted'>
              {data.isAds ? "Ads" : ""}
            </span>
            <span className='ml-1 text-muted'>
              {data.isCommercial ? "· " : ""}
            </span>
            <span className='postIsAds ml-1 text-muted'>
              {data.isCommercial ? "Commercial" : ""}
            </span>
          </div>
          {edit.isEdit === true && edit.id === data.id
            ? <div className='row' style={{ fontSize: '15px' }}>
              <input type='textarea' placeholder="What's Happening?" className='postEditedext form-control-plaintext shadow-none' style={{ outline: 'none', fontSize: '14px' }} onChange={handleEditDataChange} value={editData.text} maxLength='240' />
            </div>
            : <div className='postText row' style={{ fontSize: '15px' }}>
              {data.text}
            </div>}
          {_.isEmpty(data.image)
            ? null
            : <div className='row mt-2'>
              <img src={require('../../static/upload/' + data.image).default} alt='' className='postImage w-100 border' style={{ borderRadius: '15px' }} />
            </div>}
          <div className='postDateInput row text-muted mt-1' style={{ fontSize: "14px" }}>
            {date}
          </div>
          <div className='row mt-3'>
            <div className='col-3 pr-0'>
              <div className='row'>
                <div className='col-4 pr-0 my-auto'>
                  <img src={Reply} alt='' className='w-75' style={{ cursor: 'pointer' }} />
                </div>
                <div className='col-2'>
                  <div className=''>
                    {data.reply}
                  </div>
                </div>
              </div>
            </div>
            <div className='col-3 pr-0'>
              <div className='row'>
                <div className='col-4 pr-0'>
                  <img src={Retweet} alt='' className='w-100' style={{ cursor: 'pointer' }} />
                </div>
                <div className='col-2 my-auto'>
                  <div className=''>
                    {data.retweet}
                  </div>
                </div>
              </div>
            </div>
            <div className='col-3 pr-0'>
              <div className='row'>
                <div className='col-4 pr-0'>
                  <img src={Like} alt='' className='w-100' style={{ cursor: 'pointer' }} />
                </div>
                <div className='col-2 my-auto'>
                  <div className=''>
                    {data.likes}
                  </div>
                </div>
              </div>
            </div>
            <div className='col-3 pr-0'>
              <div className='row'>
                <div className='col-4 pr-0' onClick={() => deleteData(data.id)}>
                  <img src={Trash} alt='' className='postDelete w-75' style={{ cursor: 'pointer' }} />
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className='col-2'>
          <div className='row'>
            {edit.isEdit === true && edit.id === data.id
              ? <div className='postUpdateButton btn btn-outline-primary rounded-pill font-weight-bold' style={{ fontSize: '12px' }} onClick={updateData}> Update </div>
              : <img src={More} alt='' className='postEditButton ml-5 w-25' onClick={() => editClick(data)} style={{ cursor: 'pointer' }} />}
          </div>
        </div>
      </div>
    )
  }


  return (
    <div id="homeInput" className='col-12 border-left border-right'>
      <div className='row border-bottom sticky-top bg-white'>
        <div className='p-3'>
          <span className='font-weight-bold h5'>Home</span>
        </div>
      </div>
      <div className='row'>
        <div className='ml-3 mr-3'>
          <div className='mt-3'>
            <div className='row'>
              <div className='col-2'>
                <img src={twitterAvatar} alt='' className='border rounded-circle w-75' style={{ cursor: 'pointer' }} />
              </div>
              <div className='col-10 my-auto'>
                <div className='row'>
                  <input id="tweetInput" type='textarea' placeholder="What's Happening?" className='form-control-plaintext shadow-none' style={{ outline: 'none', fontSize: '20px' }} onChange={handleTextChange} value={values.text} maxLength='250' />
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="form-check">
                      <input id="categoryRadioEnt" className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={category === "Entertainment"} onChange={onEntChanged} />
                      <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Entertainment
                      </label>
                    </div>
                    <div className="form-check">
                      <input id="categoryRadioNews" className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={category === "News"} onChange={onNewsChanged} />
                      <label className="form-check-label" htmlFor="flexRadioDefault2">
                        News
                      </label>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-check">
                      <input id="checkboxAds" className="form-check-input" type="checkbox" value="" checked={isAds} onChange={onAdsChanged} />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        Ads
                      </label>
                    </div>
                    <div className="form-check">
                      <input id="checkboxCommercial" className="form-check-input" type="checkbox" value="" checked={isCommercial} onChange={onCommercialChanged} />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        Commercial
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Container ml-5">
                <Form.Control id="dateInput" className="m-1 ml-5 mt-2" type="date" name='date_of_birth' value={date} onChange={onDateChanged} />
              </div>
              <div className='container mt-3'>
                <div className='row justify-content-end pb-2'>
                  <div className='col-1 my-auto pr-0'>
                    <div className='row'>
                      <img src={Image} alt='' className='w-50' onClick={onImageClick} style={{ cursor: 'pointer' }} />
                      <input type='file' className='d-none' ref={inputFile} disabled accept='image/png, image/jpg, image/jpeg' /> {/* onChange={handleImageChange}*/}
                      {!_.isEmpty(values.image)
                        ? <img src={values.image} alt='' className='w-100' />
                        : null}
                    </div>
                  </div>
                  <div className='col-1 my-auto pr-0'>
                    <div className='row'>
                      <img src={Gif} alt='' className='w-50' style={{ cursor: 'pointer' }} />
                    </div>
                  </div>
                  <div className='col-1 my-auto pr-0'>
                    <div className='row'>
                      <img src={Poll} alt='' className='w-50' style={{ cursor: 'pointer' }} />
                    </div>
                  </div>
                  <div className='col-1 my-auto pr-0'>
                    <div className='row'>
                      <img src={Smiley} alt='' className='w-50' style={{ cursor: 'pointer' }} />
                    </div>
                  </div>
                  <div className='col-1 my-auto pr-0'>
                    <div className='row'>
                      <img src={Calendar} alt='' className='w-50' style={{ cursor: 'pointer' }} />
                    </div>
                  </div>
                  <div className='col-3' />
                  <div className='col-2 my-auto mr-3'>
                    <div className='ml-2'>
                      <div className='row float-right'>
                        {values.text.length >= 1 && values.text.length <= 240
                          ? <div id="tweetButton" className='btn btn-primary rounded-pill font-weight-bold border-0' style={{ fontSize: '14px' }} onClick={insertNewPost}>Tweet</div>
                          : <div id="tweetButtonDisabled" className='btn btn-primary rounded-pill font-weight-bold border-0 disabled' style={{ fontSize: '14px' }}>Tweet</div>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='row bg-light border-top border-bottom'>
            <hr className='h-50 bg-secondary mt-25 mb-0' />
          </div>
        </div>
        <div className='container border-bottom'>
          <div className='py-2 mx-2'>
            <div id="ascendingButton" className='btn btn-primary rounded-pill' onClick={() => setGetData('ASC')}>Ascending</div>
            <div id="descendingButton" className='btn btn-primary rounded-pill ml-2' onClick={() => setGetData('DESC')}>Descending</div>
          </div>
        </div>
        <div id="post" className='container'>
          {!_.isEmpty(post)
            ? search
              ? post.filter(data => data.text.indexOf(search) > -1).map((data) => {
                return bodyData(data)
              })
              : post.map((data) => {
                return bodyData(data)
              })
            : null}
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete tweet</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure want to delete this tweet?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleCloseAccepted(deleteId)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>


      </div>
    </div>
  )
}

export default HomePost
