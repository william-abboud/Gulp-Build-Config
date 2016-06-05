import React from 'react';
import ContactContainer from './ContactContainer.jsx';

export default React.createClass({
  render() {
    return (
      <div>
        <h2>{this.props.letter.toUpperCase()}</h2>
        <ul>
          {this.props.contacts.map((contact, index) => {
            return (
              <ContactContainer key={index} contactId={contact.id}>
                {contact.name}{' - '}{contact.phone}
              </ContactContainer>
            );
          })}
        </ul>
      </div>
    );
  }
});