import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import TimeAgo from 'react-timeago';

class Card extends React.Component {

  render() {
    return (
      <div className="card">
        <div className="card-content">
          <Link to={ `/content/${this.props.data._id}` }><span className="card-title grey-text text-darken-4">{ this.props.data.title }</span></Link>
          <p><span>{ this.props.data.writer }</span>님이 작성함　
            <TimeAgo date={ this.props.data.date } />
          </p>
        </div>
      </div>
      );
  }
}

export default Card;