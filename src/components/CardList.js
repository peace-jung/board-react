import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'components';

class CardList extends React.Component {

  render() {
    const mapToComponents = data => {
      return data.map((card, i) => {
        return (
          <Card data={ card } key={ card._id } />
          );
      });
    };

    return (
      <div>
        { mapToComponents(this.props.data) }
      </div>
      );
  }
}

CardList.propTypes = {
  data: PropTypes.array
};

CardList.defaultProps = {
  data: []
};

export default CardList;