import React from 'react';
import ContactSettings from './ContactSettings.jsx';

export default React.createClass({
  getInitialState() {
    return {
      areSettingsVisible: false,
      editing: false,
      phone: '',
      name: ''
    };
  },

  showSettings() {
    this.setState({ areSettingsVisible: true });
  },

  hideSettings(e) {
    this.setState({ areSettingsVisible: false });
  },

  onEdit() {
    this.setState({ editing: true });
  },

  onNewNameTypeIn(e) {
    this.setState({ name: e.target.value });
  },

  onNewPhoneTypeIn(e) {
    this.setState({ phone: e.target.value });
  },
  
  onSave() {
    this.props.onEdit(this.state.name, this.state.phone);
    this.setState({ name: '', editing: false, phone: '' });
  },

  render() {
    const {
      areSettingsVisible,
      editing,
      name,
      phone
    } = this.state;

    return (
      <li
        className="contact"
        onMouseOver={this.showSettings}
        onMouseLeave={this.hideSettings}
      >
        {this.props.children}
        {areSettingsVisible ? 
          <ContactSettings onDelete={this.props.onDelete} onEdit={this.onEdit} /> :
          null
        }
        {editing ?
         <form>
           <input type="text" placeholder="Enter name" value={name} onChange={this.onNewNameTypeIn} />
           <input type="number" placeholder="Enter phone" value={phone} onChange={this.onNewPhoneTypeIn} />
           <button onClick={this.onSave}>Save</button>
         </form> :
          null
        }
      </li>
    );
  }
});

