import React from 'react';

export default React.createClass({
	getInitialState() {
		return {
			text: ''
		};
	},

	onTypeIn(e) {
		this.setState({ text: e.target.value });
	},

	onAddTrigger(text) {
		if (!text.trim()) return;

		this.props.onAddClick(text);
	},

	render() {
		const { text } = this.state;

		return (
			<div>
				<input type="text" value={text} onChange={this.onTypeIn} required/>
				<button onClick={this.onAddTrigger.bind(this, text)}> + </button>
			</div>
		);
	}
});
