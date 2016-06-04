import React from 'react';
import { connect } from 'react-redux';
import ContactList from './ContactList.jsx'

const mapStateToProps = state => {
	return {
		list: state
	};
};

export default connect(mapStateToProps)(ContactList);