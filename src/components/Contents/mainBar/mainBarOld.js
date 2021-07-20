import React, { useState, useReducer, useRef } from 'react';

import Whatshot from "@material-ui/icons/Whatshot";
import NewReleases from "@material-ui/icons/NewReleases";
import TrendingUp from "@material-ui/icons/TrendingUp";
import Menu from "@material-ui/icons/Menu";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import ViewAgendaOutlinedIcon from '@material-ui/icons/ViewAgendaOutlined';
import ViewDayOutlinedIcon from '@material-ui/icons/ViewDayOutlined';
import Dropdown from 'react-bootstrap/Dropdown';
import ReorderOutlinedIcon from '@material-ui/icons/ReorderOutlined';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

import Posts from "../posts/postsCardView.js";


import "./mainBar.css";
import { useFetch, useInfiniteScroll } from './customHook'


// import Posts from "../posts/Posts";

export default function MainBar() {
  
    const [currentView, setcurrentView] = useState('card');




    const postReducer = (state, action) => {
        switch (action.type) {
          case 'STACK_POSTS':
            {
              return { ...state, posts: state.posts.concat(action.arr)}
            }
          case 'FETCHING_POSTS':
            return { ...state, fetching: action.fetching }
          default:
            return state;
        }
      }
    

      const pageReducer = (state, action) => {
        switch (action.type) 
        {
          case 'ADVANCE_PAGE':
            console.log(state)
            return { ...state,  page: state.page + 1}
          default:
            return state;
        }
      }

      const nextPageReducer = (state, action) => {
        switch (action.type) 
        {
          case 'ADVANCE_PAGE':
            return { ...state,  lastPostName: 't3_onivlo'}
          default:
            return state;
        }
      }
    
      //const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 })
      const [postData, postDispatch] = useReducer(postReducer, { posts: [], fetching: true})
      const [nextPage, nextPageDispatch] = useReducer(nextPageReducer, { lastPostName: "" })


      let bottomBoundaryRef = useRef(null);
      useFetch(nextPage, postDispatch);
      //useLazyLoading('.card-img-top', postData.posts)
      useInfiniteScroll(bottomBoundaryRef, nextPageDispatch);

    function displayCardView() {
        setcurrentView("card");

    }
    function displayCompactView() {
        setcurrentView("compact");

    }
    function displayClassicView(){
        setcurrentView("classic");
    }
  return (
    <div className="main-bar">
      <div className="filter-container">
        <div className="filter-element hoverable">
          <Whatshot />
          <span>Hot</span>
        </div>
        <div className="filter-element-secondary hoverable">
          <NewReleases />
          <span>New</span>
        </div>
        <div className="filter-element-secondary hoverable">
          <TrendingUp />
          <span>Top</span>
        </div>
        <MoreHoriz className="filter-element-tertiary hoverable" />
        <div className="spacer"></div>
        <div className="filter-element-menu hoverable">
        </div>
        <Dropdown>
            <Dropdown.Toggle className="filter-element-menu hoverable" >
                <Menu />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="javascript:void(0)" onClick={()=>displayCardView()}><ViewAgendaOutlinedIcon/> Card</Dropdown.Item>
                <Dropdown.Item href="javascript:void(0)" onClick={()=>displayClassicView()}><ViewDayOutlinedIcon/> Classic</Dropdown.Item>
                <Dropdown.Item href="javascript:void(0)" onClick={()=>displayCompactView()}><ReorderOutlinedIcon/> Compact</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

      </div>
      {currentView == 'card' &&
        <div>
          <div className='bg-success card'>
              Card View
          </div>
        </div>
      }
     {currentView == 'classic' &&
         <div>
            <div className='bg-primary card'>
            classic View
            </div>
        </div>
      }
     {currentView == 'compact' &&
         <div>
            <div className='bg-danger card'>
            compact View
            </div>
        </div>
      }
      {/* <Posts /> */}

      <div className="">
      {/* <Posts/> */}
      
      <div id='posts' className="container-fluid">
        <div className="row">
          <div className="col-12">
          {postData.posts.map((post, index) => {
            return (
              <div key={index} className="card">
                <div className="card-body ">
                  <div className="card-img-top">
                    {post.data.title}
                  </div>
                </div>
                <div className="card-footer">
                  <p className="card-text text-center text-capitalize text-primary">Shot by: {post.index}</p>
                </div>
              </div>
            )
          })}
          </div>

        </div>
      </div>

      {postData.fetching && (
        <div className="text-center bg-secondary m-auto p-3">
          <p className="m-0 text-white">Fetching Posts</p>
        </div>
      )}
      <div id='page-bottom-boundary' style={{ border: '1px solid red' }} ref={bottomBoundaryRef}></div>
    </div>
    </div>
  );
}

