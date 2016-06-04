import React from 'react';
import ContactSettings from './ContactSettings.jsx';

export default React.createClass({
  getInitialState() {
    return {
      areSettingsVisible: false
    };
  },

  showSettings() {
    this.setState({ areSettingsVisible: true });
  },

  hideSettings() {
    this.setState({ areSettingsVisible: false });
  },

  render() {
    const { areSettingsVisible } = this.state;

    return (
      <li 
        onMouseOver={this.showSettings}
        onMouseOut={this.hideSettings}
      >
        {this.props.children}
        {areSettingsVisible ? <ContactSettings onDelete={() => {}} onEdit={() => {}} /> : null}
      </li>
    );
  }
});

