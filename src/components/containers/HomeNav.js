/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import localforage from 'localforage'

import HomeButton from '../../static/image/home-blue.png'
import TwitterLogo from '../../static/image/twitter-logo.png'
import ExploreLogo from '../../static/image/hashtag.png'
import Notification from '../../static/image/Notification.png'
import Messages from '../../static/image/messages.png'
import Bookmark from '../../static/image/bookmark.png'
import List from '../../static/image/lists.png'
import Profile from '../../static/image/profile.png'
import More from '../../static/image/more.png'
import { ContactSupportOutlined } from '@material-ui/icons'

function HomeNav() {
  const [tab, setTab] = useState('home')
  const history = useHistory()
  const [color, setColor] = useState(true)

  const logoutClick = async () => {
    await localforage.removeItem('token')
    history.push('/')
  }

  // const [dragItem, setDragItem] = useState();
  // const [list, setList] = useState([
  //   <a className='row p-2 text-decoration-none default-hover mt-2'>
  //     <div className='col-4 pr-0'>
  //       <img src={HomeButton} alt='' className='w-75' />
  //     </div>
  //     <div className='col-8 align-self-center'>
  //       <span className='font-weight-bold' style={{ color: tab === 'home' ? '#1da1f2' : 'black' }}>Home</span>
  //     </div>
  //   </a>,
  //   <a className='row p-2 text-decoration-none default-hover mt-2'>
  //     <div className='col-4 pr-0'>
  //       <img src={ExploreLogo} alt='' className='w-75' />
  //     </div>
  //     <div className='col-8 align-self-center'>
  //       <span className='font-weight-bold' style={{ color: tab === 'explore' ? '#1da1f2' : 'black' }}>Explore</span>
  //     </div>
  //   </a>,
  //   <a className='row p-2 text-decoration-none default-hover mt-2'>
  //     <div className='col-4 pr-0'>
  //       <img src={Notification} alt='' className='w-75' />
  //     </div>
  //     <div className='col-8 align-self-center'>
  //       <span className='font-weight-bold' style={{ color: tab === 'notifications' ? '#1da1f2' : 'black' }}>Notifications</span>
  //     </div>
  //   </a>,
  //   <a className='row p-2 text-decoration-none default-hover mt-2'>
  //     <div className='col-4 pr-0'>
  //       <img src={Messages} alt='' className='w-75' />
  //     </div>
  //     <div className='col-8 align-self-center'>
  //       <span className='font-weight-bold' style={{ color: tab === 'messages' ? '#1da1f2' : 'black' }}>Messages</span>
  //     </div>
  //   </a>,
  //   <a className='row p-2 text-decoration-none default-hover mt-2'>
  //     <div className='col-4 pr-0'>
  //       <img src={Bookmark} alt='' className='w-75' />
  //     </div>
  //     <div className='col-8 align-self-center'>
  //       <span className='font-weight-bold' style={{ color: tab === 'bookmarks' ? '#1da1f2' : 'black' }}>Bookmarks</span>
  //     </div>
  //   </a>,
  //   <a className='row p-2 text-decoration-none default-hover mt-2'>
  //     <div className='col-4 pr-0'>
  //       <img src={List} alt='' className='w-75' />
  //     </div>
  //     <div className='col-8 align-self-center'>
  //       <span className='font-weight-bold' style={{ color: tab === 'lists' ? '#1da1f2' : 'black' }}>Lists</span>
  //     </div>
  //   </a>,
  //   <a className='row p-2 text-decoration-none default-hover mt-2'>
  //     <div className='col-4 pr-0'>
  //       <img src={Profile} alt='' className='w-75' />
  //     </div>
  //     <div className='col-8 align-self-center'>
  //       <span className='font-weight-bold' style={{ color: tab === 'profile' ? '#1da1f2' : 'black' }}>Profile</span>
  //     </div>
  //   </a>,
  //   <a className='row p-2 text-decoration-none default-hover mt-2'>
  //     <div className='col-4 pr-0'>
  //       <img src={More} alt='' className='w-75' />
  //     </div>
  //     <div className='col-8 align-self-center'>
  //       <span className='font-weight-bold' style={{ color: tab === 'more' ? '#1da1f2' : 'black' }}>More</span>
  //     </div>
  //   </a>
  // ]);

  // const handleDragStart = (index) => {
  //   setDragItem(index);
  // };

  // const handleDragEnter = (e, index) => {
  //   e.target.style.backgroundColor = "#336699";
  //   const newList = [...list];
  //   const item = newList[dragItem];
  //   newList.splice(dragItem, 1);
  //   newList.splice(index, 0, item);
  //   setDragItem(index);
  //   setList(newList);
  // };

  // const handleDragLeave = (e) => {
  //   e.target.style.backgroundColor = "white";
  // };

  // const handleDrop = (e) => {
  //   e.target.style.backgroundColor = "white";
  // };

  const allowDrop = (ev) => {
    ev.preventDefault();
    if (color === true) {
      let b = document.getElementById("beforeDragNav")
      b.setAttribute("class", "bg-info border border-dark mt-3 pb-3")
    }
    // let c = document.getElementById("beforeDragNav")
    // c.setAttribute("class", "bg-info border border-dark mt-3 pb-3")
  }

  const allowDrop2 = (ev) => {
    ev.preventDefault();
    let a = document.getElementById("afterDragNav")
    a.setAttribute("class", "bg-info border border-dark mt-3 pb-3")
  }

  const dragOverText = (ev) => {
    ev.preventDefault();
    setColor(false);
    let a = document.getElementById("beforeDragNav")
    a.setAttribute("class", "border border-dark mt-3 pb-3")
  }

  const dragEnd = (ev) => {
    ev.preventDefault();
    let a = document.getElementById("beforeDragNav")
    a.setAttribute("class", "border border-dark mt-3 pb-3")
  }

  const dragEnd2 = (ev) => {
    ev.preventDefault();
    let a = document.getElementById("afterDragNav")
    a.setAttribute("class", "border border-dark mt-3 pb-3")
    setColor(true);
  }

  const drag = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);

    let a = document.getElementById("beforeDragNav")
    a.setAttribute("class", "border border-dark mt-3 pb-3")
  }

  const drag2 = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
    let a = document.getElementById("afterDragNav")
    a.setAttribute("class", "border border-dark mt-3 pb-3")
  }

  const drop = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    let a = document.getElementById("afterDragNav")
    a.setAttribute("class", "border border-dark mt-3 pb-3")
    let b = document.getElementById("beforeDragNav")
    b.setAttribute("class", "border border-dark mt-3 pb-3")

  }

  return (
    <div id="homeNav" className='col-2 mr-5' style={{ flexBasis: "100%" }}>
      <div className='row sticky-top'>
        <div className='col'>
          {/* <div className='row'>
            <a>
              <div className='ml-3'>
                <img src={TwitterLogo} alt='' className='w-25' />
              </div>
            </a>
          </div> */}
          <a className='row p-2 text-decoration-none mt-2' style={{ width: "190px" }}>
            <div className='col-4 pr-0'>
              <img src={TwitterLogo} alt='' className='w-75' />
            </div>
            <div className='col-8 align-self-center'>
              {/* <span className='font-weight-bold' style={{ color: 'black' }}>HTML DnD</span> */}
            </div>
          </a>
          {/* <ul className="dnd" style={{ listStyle: "none", padding: 0 }}>
            {list &&
              list.map((item, index) => (
                <li
                  draggable
                  key={index}
                  onDragStart={() => handleDragStart(index)}
                  onDragEnter={(e) => handleDragEnter(e, index)}
                  onDragLeave={(e) => handleDragLeave(e)}
                  onDrop={(e) => handleDrop(e)}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {item}
                </li>
              ))}
          </ul> */}
          <a className='row p-2 text-decoration-none default-hover mt-2'>
            <div className='col-4 pr-0'>
              <img src={HomeButton} alt='' className='w-75' />
            </div>
            <div className='col-8 align-self-center'>
              <span className='font-weight-bold' style={{ color: tab === 'home' ? '#1da1f2' : 'black' }}>Home</span>
            </div>
          </a>
          <a className='row p-2 text-decoration-none default-hover mt-2'>
            <div className='col-4 pr-0'>
              <img src={ExploreLogo} alt='' className='w-75' />
            </div>
            <div className='col-8 align-self-center'>
              <span className='font-weight-bold' style={{ color: tab === 'explore' ? '#1da1f2' : 'black' }}>Explore</span>
            </div>
          </a>
          <a className='row p-2 text-decoration-none default-hover mt-2'>
            <div className='col-4 pr-0'>
              <img src={Notification} alt='' className='w-75' />
            </div>
            <div className='col-8 align-self-center'>
              <span className='font-weight-bold' style={{ color: tab === 'notifications' ? '#1da1f2' : 'black' }}>Notifications</span>
            </div>
          </a>
          <a className='row p-2 text-decoration-none default-hover mt-2'>
            <div className='col-4 pr-0'>
              <img src={Messages} alt='' className='w-75' />
            </div>
            <div className='col-8 align-self-center'>
              <span className='font-weight-bold' style={{ color: tab === 'messages' ? '#1da1f2' : 'black' }}>Messages</span>
            </div>
          </a>
          <a className='row p-2 text-decoration-none default-hover mt-2'>
            <div className='col-4 pr-0'>
              <img src={Bookmark} alt='' className='w-75' />
            </div>
            <div className='col-8 align-self-center'>
              <span className='font-weight-bold' style={{ color: tab === 'bookmarks' ? '#1da1f2' : 'black' }}>Bookmarks</span>
            </div>
          </a>
          <a className='row p-2 text-decoration-none default-hover mt-2'>
            <div className='col-4 pr-0'>
              <img src={List} alt='' className='w-75' />
            </div>
            <div className='col-8 align-self-center'>
              <span className='font-weight-bold' style={{ color: tab === 'lists' ? '#1da1f2' : 'black' }}>Lists</span>
            </div>
          </a>
          <a className='row p-2 text-decoration-none default-hover mt-2'>
            <div className='col-4 pr-0'>
              <img src={Profile} alt='' className='w-75' />
            </div>
            <div className='col-8 align-self-center'>
              <span className='font-weight-bold' style={{ color: tab === 'profile' ? '#1da1f2' : 'black' }}>Profile</span>
            </div>
          </a>
          <a className='row p-2 text-decoration-none default-hover mt-2'>
            <div className='col-4 pr-0'>
              <img src={More} alt='' className='w-75' />
            </div>
            <div className='col-8 align-self-center'>
              <span className='font-weight-bold' style={{ color: tab === 'more' ? '#1da1f2' : 'black' }}>More</span>
            </div>
          </a>
          <span className='font-weight-bold' style={{ color: 'black' }}>HTML DnD</span>
          <div id="beforeDragNav" className="border border-dark pb-3 mt-3" style={{ padding: "inherit", width: "130%", height: "150px" }} onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)} onDragLeave={(e) => dragEnd(e)}>
            <div id="buttonTweetLogout" style={{ padding: "inherit", borderRadius: "5px", paddingTop: "1px", backgroundColor: '#f6f6f6' }} className="mt-3" draggable onDragStart={(e) => drag(e)} onDragOver={(e) => dragOverText(e)}>
              <div className='row mt-3'>
                <div className='btn btn-primary rounded-pill font-weight-bold w-100 border-0 default-button' style={{ fontSize: '14px' }}>Tweet</div>
              </div>
              <div className='row'>
                <div id="logoutButton" className='btn btn-outline-danger rounded-pill font-weight-bold w-100 mt-3' style={{ fontSize: '14px' }} onClick={logoutClick}>Logout</div>
              </div>
            </div>
          </div>
          <div id="afterDragNav" className="border border-dark mt-3 pb-3" onDragStart={(e) => drag2(e)} style={{ padding: "inherit", width: "130%", height: "150px" }} onDragLeave={(e) => dragEnd2(e)} onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop2(e)}>

          </div>
        </div>
      </div >

    </div >
  )
}

export default HomeNav
