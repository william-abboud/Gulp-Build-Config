import foo from './foo';
import Example from './sample.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<Example />, document.body);
const hello = hi => {
	console.log(`${hi} I love Gulp watch !!!`);
};

hello('yeah !!');
