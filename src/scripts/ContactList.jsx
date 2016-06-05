import React from 'react';
import AlphabetCategory from './AlphabetCategory.jsx';

export default React.createClass({
  render() {
    const { contacts } = this.props;
    const alphabet = Object.keys(contacts);

    return (
      <ul>
        {alphabet.map((letter, index) => {
          if (!contacts[letter].length) return;

          return <AlphabetCategory key={index} contacts={contacts[letter]} letter={letter} />;
        })}
      </ul>
    );
  }
});

