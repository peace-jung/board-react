import React from 'react';
import TimeAgo from 'react-timeago';
import { CommentList } from 'components';

class Post extends React.Component {

  render() {

    return (
      <div className="post">
        <div className="section">
          <h5 className="post-title">{ this.props.data.title }</h5>
          <p><span>{ this.props.data.writer }</span>님이 작성함　
          <TimeAgo date={ this.props.data.date } />
          </p>
          <div className="divider post-content"></div>
          <pre>
            { this.props.data.contents }
          </pre>
        </div>
        <div className="section">
          <h5 className="post-title">Comments</h5>
          <div className="divider post-content"></div>
          <CommentList data={this.props.data.comments} />
        </div>
      </div>
      );
  }
}

export default Post;