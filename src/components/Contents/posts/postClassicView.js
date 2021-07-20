import React , {Component} from "react";

import "./posts.css";

// import posts from "./posts.json";

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Button from "../../buttons/buttons";

import ModeCommentIcon from "@material-ui/icons/ModeComment";
import ShareIcon from "@material-ui/icons/Share";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CallReceivedIcon from '@material-ui/icons/CallReceived';

import moment from 'moment'
import ReactHtmlParser from 'react-html-parser';


class PostsClassic extends Component 
{
    constructor(props) {
        super(props);
    }

  render() {
    return (
      <div className="posts-wrapper">
        {this.props.dataFromParent.map((post, index) => (
          <div className="post" key={index}>
            <div className="post-sidebar">
              <ArrowUpwardIcon className="upvote" />
              <span>{post.data.ups}</span>
              <ArrowDownwardIcon className="downvote" />
            </div>
            <div className="post-body">
              <a href={post.data.url} className="title">{post.data.title}</a>
                {post.showData == '1' &&
                    <div >
                        {post.data.selftext_html && <div className="mt-3" dangerouslySetInnerHTML={{ __html: ReactHtmlParser(post.data.selftext_html) }} />}
                    </div>
                }
            </div>
            <div className="post-title">
              <img src="./subreddit.jpg" />
              <span className="subreddit-name">r/{post.data.subreddit_name_prefixed}</span>
              <span className="post-user">Posted by</span>
              <span className="post-user underline">u/{post.data.author_fullname}</span>
              <span className="post-user"> {moment(new Date(post.data.created*1000).toGMTString()).fromNow()}</span>
              <div className="spacer"></div>
            </div>
            <div className="post-footer">
            <div className="footer-action">
                <CallReceivedIcon onClick={()=>this.props.handler(post, index)}/>
            </div>

              <div className="comments footer-action">
                <ModeCommentIcon className="comment-icon" />
                <span>{post.data.num_comments} Comments</span>
              </div>
              <div className="share footer-action">
                <ShareIcon />
                <span>Share</span>
              </div>
              <div className="save footer-action">
                <BookmarkIcon />
                <span>Save</span>
              </div>
              <MoreHorizIcon className="more-icon footer-action" />

            </div>


          </div>
        ))}
      </div>
    );
  }
}

export default PostsClassic
