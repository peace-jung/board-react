import React from 'react';
import TimeAgo from 'react-timeago';

class Comment extends React.Component {
  render() {

    return (
      <div className="row valign-wrapper comment">
        <div className="col m2 s2 comment-id">
          <span className="black-text">{this.props.data.writer}</span>
        </div>
        <div className="col m8 s10">
          <pre className="black-text">{this.props.data.contents}</pre>
        </div>
        <div className="col m2 s12">
          <TimeAgo date={ this.props.data.date } />
        </div>
      </div>
    );
  }
}

export default Comment;