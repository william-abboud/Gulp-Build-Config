import React from 'react';

export default React.createClass({
	getInitialState() {
		return {
			text: '',
      phone: ''
		};
	},

	onNameEnter(e) {
		this.setState({ text: e.target.value });
	},

  onNumEnter(e) {
    this.setState({ phone: e.target.value });
  },

	onAddTrigger(text, phone) {
		if (!text.trim()) return;

		this.props.onAddClick(text, phone);
		this.setState({text: '', phone: ''});
	},

	render() {
		const { text, phone } = this.state;

		return (
			<form>
				<input type="text" placeholder="Enter contact name" value={text} onChange={this.onNameEnter} required />
        <input type="number" placeholder="Enter phone number" value={phone} onChange={this.onNumEnter} required />
				<button onClick={this.onAddTrigger.bind(this, text, phone)}> + </button>
			</form>
		);
	}
});
