import 'babel-polyfill';
import React from'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from  'react-redux'; 
import contactsReducer from './contactsReducer';
import AddContactContainer from './AddContactContainer.jsx';
import ContactListContainer from './ContactListContainer.jsx';

const store = createStore(contactsReducer);
render(
  <Provider store={store}>
    <div>
      <AddContactContainer />
      <ContactListContainer />
    </div>
  </Provider>,
  document.getElementById('root')
);