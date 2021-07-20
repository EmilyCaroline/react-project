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


class mainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      page: 0,
      currentView:'card',
      prevY: 0
    };
    this.handler = this.handler.bind(this)
  }
  handler(data, index) {
    if(index != null)
    {
      console.log(this.state.posts[index].showData)

      let toggle = '1';

      if(this.state.posts[index].showData == '1')
      {
        toggle = '0';
      }
    
      let data = [ ...this.state.posts ];
      data[index] = {...data[index], showData: toggle};
      this.setState({posts:data});
      this.forceUpdate()
        console.log(this.state.posts[index])
      }
  }
  getPosts(after) {
    this.setState({ loading: true });
    axios
      .get(
        `https://www.reddit.com/r/makeup.json?limit=100&after=${after}`
      )
      .then(res => {
        console.log(res.data.data.children)
        this.setState({ posts: [...this.state.posts, ...res.data.data.children] });
        this.setState({ loading: false });
      });
  }
  componentDidMount() {
    this.getPosts(this.state.page);

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
    console.log(this.state.prevY)

    if (this.state.prevY > y) 
    {
      const lastPost = this.state.posts[this.state.posts.length - 1];
      const curPage = lastPost ? lastPost.data.name : null;
      this.getPosts(curPage);
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
        {this.state.currentView == 'card' &&
          <PostsCardView dataFromParent = {this.state.posts}/>
        }
        {this.state.currentView == 'compact' &&
          <PostsCompact dataFromParent = {this.state.posts} handler={this.handler}/>
        }
        {this.state.currentView == 'classic' &&
          <PostsClassic dataFromParent = {this.state.posts} handler={this.handler}/>
        }

        <div ref={loadingRef => (this.loadingRef = loadingRef)} style={loadingCSS}>
          <span style={loadingTextCSS} className="m-2 text-red">Loading...</span>
        </div>

      </div>
    );
  }
}

export default mainComponent;