import { generate } from 'shortid';
import React from 'react';
import { connect } from 'react-redux';
import AddContact from './AddContact.jsx';

const mapDispatchToProps = dispatch => {
	return {
		onAddClick(name) {
			dispatch({
				type: 'ADD_CONTACT',
				id: generate(),
				name,
			});
		}
	};
};

export default connect(state => { return {} }, mapDispatchToProps)(AddContact);
