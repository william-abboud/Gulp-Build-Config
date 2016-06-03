import React from 'react';
import Contact from './Contact.jsx';

export default React.createClass({
	render() {
		const { list } = this.props;
		const alphabetArr = Object.keys(list);

		return (
			<ul>
				{alphabetArr.map((letter, index) => {
					if (!list[letter].length) return;
					
					return (
						<li key={index}>
							<ul>
								{list[letter].map(({ name }, i) => {
									return ( <Contact key={i}>{name}</Contact> );
								})}
							</ul>
						</li>
					);
				})}
			</ul>
		);
	}
});