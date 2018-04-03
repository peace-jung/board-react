import React from 'react';
import TimeAgo from 'react-timeago';
import PropTypes from 'prop-types';
import { Comment } from 'components';
import { CommentWrite } from 'components';

class CommentList extends React.Component {
  render() {
    const mapToComments = data => {
       return data.map((comment, i) => {
        return (
          <Comment data={ comment } key={ comment._id } />
          );
      }); 
    };

    return (
      <div>
        { mapToComments(this.props.data) } 
        <CommentWrite />
      </div>
      );
  }
}

CommentList.propTypes = {
  data: PropTypes.array // comments
};

CommentList.defaultProps = {
  data: []
};

export default CommentList;