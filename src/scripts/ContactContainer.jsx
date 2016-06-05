import React from 'react';
import { connect } from 'react-redux';
import Contact from './Contact.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
    children: ownProps.children,
    name: ownProps.name,
    phone: ownProps.phone
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDelete() {
      dispatch({
        type: 'DELETE_CONTACT',
        id: ownProps.contactId
      });
    },

    onEdit(name, phone) {
      dispatch({
        type: 'EDIT_CONTACT',
        id: ownProps.contactId,
        name,
        phone
      })
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);