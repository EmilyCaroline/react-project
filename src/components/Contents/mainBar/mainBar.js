import React, { Component } from 'react';

import axios from "axios";

import PostsCardView from "../posts/postsCardView.js";
import PostsClassic  from "../posts/postClassicView.js";
import PostsCompact  from "../posts/postCompactView";


import Whatshot from "@material-ui/icons/Whatshot";
import NewReleases from "@material-ui/icons/NewReleases";
import TrendingUp from "@material-ui/icons/TrendingUp";
import Menu from "@material-ui/icons/Menu";
import ViewAgendaOutlinedIcon from '@material-ui/icons/ViewAgendaOutlined';
import ViewDayOutlinedIcon from '@material-ui/icons/ViewDayOutlined';
import Dropdown from 'react-bootstrap/Dropdown';
import ReorderOutlinedIcon from '@material-ui/icons/ReorderOutlined';


import "./mainBar.css";
import LoadingOverlay from 'react-loading-overlay'


class mainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      page: 0,
      currentView:'card',
      currentSortValue:'top',
      prevY: 0
    };
    this.handler = this.handler.bind(this)
    this.upvote = this.upvote.bind(this)
    this.downvote = this.downvote.bind(this)
  }
  upvote(post, index)
  {
    if(index != null)
    {
      let p = post.data
      let number = post.data.ups
        number++;
        let data = [ ...this.state.posts ];
        p.ups = number
        data[index] = {...data[index], data: p};
        this.setState({posts:data});  

    }
  }
  downvote(post, index)
  {
    if(index != null)
    {
      let p = post.data
      let number = post.data.ups
      if(number > 0)
      {
        number--;
        let data = [ ...this.state.posts ];
        p.ups = number
        data[index] = {...data[index], data: p};
        this.setState({posts:data});
      }
    }
  }
  handler(data, index) {
    if(index != null)
    {

      let toggle = '1';

      if(this.state.posts[index].showData == '1')
      {
        toggle = '0';
      }
    
      let data = [ ...this.state.posts ];
      data[index] = {...data[index], showData: toggle};
      this.setState({posts:data});
      this.forceUpdate()
        //console.log(this.state.posts[index])
      }
  }
  async getPosts(url) {
    console.log("url" + url)
    this.setState({ loading: true });
    await axios
      .get(url)
      .then(res => {
        //this.setState({ posts: [...this.state.posts, ...res.data.data.children] });

        this.setState({ posts: [] }, () => this.setState({ posts: res.data.data.children }))

        this.setState({ loading: false });
      });
  }
  componentDidMount() {
    let url = `https://www.reddit.com/r/makeup.json?limit=100`;
    if(this.state.currentSortValue == 'hot')
    {
        url= `https://www.reddit.com/r/makeup/hot.json?limit=100`;
    }
    else if(this.state.currentSortValue == 'new')
    {
      url= `https://www.reddit.com/r/makeup/new.json?limit=100`;
    }
    else if(this.state.currentSortValue == 'top')
    {
      url= `https://www.reddit.com/r/makeup/top.json?limit=100`;
    }
   
    this.getPosts(url);

    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };
    
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }
  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;

    if (this.state.prevY > y) 
    {
      const lastPost = this.state.posts[this.state.posts.length - 1];
      const curPage = lastPost ? lastPost.data.name : null;
      let url = `https://www.reddit.com/r/makeup.json?limit=100&after=${curPage}`
      if(this.state.currentSortValue == 'hot')
      {
          url= `https://www.reddit.com/r/makeup/hot.json?limit=100&after=${curPage}`;
      }
      else if(this.state.currentSortValue == 'new')
      {
        url= `https://www.reddit.com/r/makeup/new.json?limit=100&after=${curPage}`;
      }
      else if(this.state.currentSortValue == 'top')
      {
        url= `https://www.reddit.com/r/makeup/top.json?limit=100&after=${curPage}`;
      }
   
      
      this.getPosts(url);
      this.setState({ page: curPage });
    }
    this.setState({ prevY: y });
  }
  displayCardView() {
    this.setState({ currentView: 'card' });

  }
  displayCompactView() {
    this.setState({ currentView: 'compact' });
  }
  displayClassicView(){
        // setcurrentView("classic");
    this.setState({ currentView: 'classic' });
  }
  clickOnBtn(action)
  {
    this.setState({ currentSortValue: action });

    let url = null;
    if(action == 'hot')
    {
        url= `https://www.reddit.com/r/makeup/hot.json?limit=100`;
    }
    else if(action == 'new')
    {
      url= `https://www.reddit.com/r/makeup/new.json?limit=100`;
    }
    else if(action == 'top')
    {
      url= `https://www.reddit.com/r/makeup/top.json?limit=100`;
    }
    
    if(url != null)
    {
      this.getPosts(url);
    }

  }
  render() {
    // Additional css
    const loadingCSS = {
      height: "100px",
      margin: "30px",
      color:"red",
    };

    // To change the loading icon behavior
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };
    return (
      <div className="main-bar">
        <div className="filter-container">
          <div className="filter-element hoverable" onClick={()=>this.clickOnBtn('hot')}>
            <Whatshot />
            <span>Hot</span>
          </div>
          <div className="filter-element-secondary hoverable" onClick={()=>this.clickOnBtn('new')}>
            <NewReleases />
            <span>New</span>
          </div>
          <div className="filter-element-secondary hoverable" onClick={()=>this.clickOnBtn('top')}>
            <TrendingUp />
            <span>Top</span>
          </div>
          <div className="spacer"></div>
          {/* <div className="filter-element-menu hoverable">
          </div> */}
        <Dropdown>
            <Dropdown.Toggle className="filter-element-menu hoverable" >
                <Menu />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={()=>this.displayCardView()}><ViewAgendaOutlinedIcon/> Card</Dropdown.Item>
                <Dropdown.Item onClick={()=>this.displayClassicView()}><ViewDayOutlinedIcon/> Classic</Dropdown.Item>
                <Dropdown.Item onClick={()=>this.displayCompactView()}><ReorderOutlinedIcon/> Compact</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
      </div>

          <LoadingOverlay
            active = {this.state.loading}
            text='Loading your content...'
            styles={{
              spinner: (base) => ({
                ...base,
                color: 'red',
                width: '100px',
                background: 'rgba(255, 0, 0, 0.5)',
                '& svg circle': {
                  stroke: 'rgba(255, 0, 0, 0.5)'
                }
              })
            }}
            >
               {this.state.currentView == 'card' &&
                  <PostsCardView dataFromParent = {this.state.posts} upvote={this.upvote} downvote={this.downvote}/>
                }
                {this.state.currentView == 'compact' &&
                  <PostsCompact dataFromParent = {this.state.posts} handler={this.handler} upvote={this.upvote} downvote={this.downvote}/>
                }
                {this.state.currentView == 'classic' &&
                  <PostsClassic dataFromParent = {this.state.posts} handler={this.handler} upvote={this.upvote} downvote={this.downvote}/>
                }

          </LoadingOverlay>


        <div ref={loadingRef => (this.loadingRef = loadingRef)} style={loadingCSS}>
          <span style={loadingTextCSS} className="m-2 text-red">Loading...</span>
        </div>

      </div>
    );
  }
}

export default mainComponent;
