import React, { Component } from 'react';
import './Die.css';

class Die extends Component {
    render() {
        let diceFace = `fas fa-dice-${this.props.face}`;
        return (
            <div className="Die">
                <h1><i className={diceFace}></i></h1>
            </div>
        )
    }
}

export default Die;