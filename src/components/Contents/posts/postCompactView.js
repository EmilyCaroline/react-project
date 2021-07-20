import React , {Component} from "react";

import "./posts.css";

// import posts from "./posts.json";
import Card from 'react-bootstrap/Card'
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import PermMediaOutlinedIcon from '@material-ui/icons/PermMediaOutlined';
import Button from "../../buttons/buttons";

import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import ReactHtmlParser from 'react-html-parser';
import moment from 'moment'

import 'bootstrap/dist/css/bootstrap.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CompareArrowsOutlinedIcon from '@material-ui/icons/CompareArrowsOutlined';
class Posts extends Component 
{
  render() {
    return (
        <div className="compact-view-wrapper">
        {this.props.dataFromParent.map((post, index) => (
        <Row className="compact-view-post">
            <Col md={2} className="post-sidebar-compact">
                <ArrowUpwardIcon />
                <span>{post.data.ups}</span>
                <ArrowDownwardIcon/>
            </Col>
            <Col md={8} style={{ padding:10}}>
                <Row className="no-gutters">
                    <Col md={1}>
                    <span class="rightIcon">
                        <PermMediaOutlinedIcon className="icon-unlock"/>                         
                        <CompareArrowsOutlinedIcon className="icon-lock" onClick={()=>this.props.handler(post, index)}></CompareArrowsOutlinedIcon>             
                    </span>
                    </Col>
                    <Col md={9}>
                        <a href={post.data.url} className="title">{post.data.title}</a>
                        <div>
                            <span className="post-user-compact">Posted by</span>
                            <span className="post-user-compact">u/{post.data.author_fullname}</span>
                            <span className="post-user-compact"> {moment(new Date(post.data.created*1000).toGMTString()).fromNow()}</span>
                        </div>
                        {post.showData == '1' &&
                            <div >
                                {post.data.selftext_html && <div className="mt-3" dangerouslySetInnerHTML={{ __html: ReactHtmlParser(post.data.selftext_html) }} />}
                            </div>
                        }

                    </Col>
                </Row>
            </Col>
            <Col md={2}>
                <Row>
                    <Col md="12" >
                        <ModeCommentOutlinedIcon className="comment-icon-compact-view" />
                        <span>{post.data.num_comments} </span>  
                        <MoreHorizIcon></MoreHorizIcon>             
 
                    </Col>
                </Row>
                </Col>
            </Row> 
        ))}
      </div>
    );
  }
}

export default Posts
