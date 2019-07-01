import React, { Component } from 'react';
import './Heading.css';

class Heading extends Component {
	static defaultProps = {
		eng: <h1>The Dice<br />You Want!</h1>,
		esp: <h1>¡Los Dados<br />Que Buscas!</h1>
	}
    render() {
        return (
            <div className="Heading">
                <header>					
					{this.props[this.props.lang]}
                </header>
            </div>
        )
    }
}

export default Heading;