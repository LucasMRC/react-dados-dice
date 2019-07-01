import React, { Component } from 'react';
import './DiceGame.css';
import Board from './Board';
import Heading from './Heading';

class DiceGame extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			lang: 'esp',
		};
		this.chooseLanguage = this.chooseLanguage.bind(this);
	}
	chooseLanguage(e) {
		e.preventDefault();
		let lang = e.currentTarget.dataset.lang;
		this.setState({
			lang: lang
		});
	}
	render() {
		return (
			<div className="DiceGame">
				<ul className="DiceGame-languages">
					<li>
						<p>En 
							<button data-lang="esp" onClick={this.chooseLanguage}>Español</button>
						, por favor.</p>
					</li>
					<li>
						<p>In 
							<button data-lang="eng" onClick={this.chooseLanguage}>English</button>
						, please.</p>
					</li>
				</ul>
				<Heading lang={this.state.lang} />
				<Board lang={this.state.lang}/>
			</div>
		)
	}
}

export default DiceGame;