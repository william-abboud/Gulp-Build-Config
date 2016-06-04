import React from 'react';

export default React.createClass({
  render() {
    const {onDelete, onEdit} = this.props;

    return (
      <div>
        <button onClick={onDelete()}>X</button>
        <button onClick={onEdit()}>Edit</button>
      </div>
    );
  }
});