import 'babel-polyfill';
import React from'react';
import ReactDOM from 'react-dom';
import HelloWorld from './sample.jsx';

ReactDOM.render(<HelloWorld />, document.getElementById('root'));

console.log([1, 2, 3].findIndex(item => item === 3));