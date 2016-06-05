import { generate } from 'shortid';
import React from 'react';
import { connect } from 'react-redux';
import AddContact from './AddContact.jsx';

const mapDispatchToProps = dispatch => {
	return {
		onAddClick(name, phone) {
			dispatch({
				type: 'ADD_CONTACT',
				id: generate(),
				name,
				phone,
			});
		}
	};
};

export default connect(state => { return {} }, mapDispatchToProps)(AddContact);
