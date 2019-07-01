import React, { Component } from 'react';
import Die from './Die';
import './Board.css';

class Board extends Component {
    static defaultProps = {
        faces: ['one', 'two', 'three', 'four', 'five', 'six'],
        points: [1, 2, 3, 4, 5, 6],
		generateRandomIndex: () => Math.floor(Math.random() * 6),
		eng: {
			choose_msg: 'How many dice you will use?',
			dice_result: 'You got ',
			select_text: 'Choose a number',
			button_msg: 'Click to Roll!',
			button_rolling_msg: 'Rolling...'
		},
		esp: {
			choose_msg: '¿Cuántos dados necesitas?',
			dice_result: 'Obtuviste ',
			select_text: 'Elige un número',
			button_msg: '¡Clickea para tirar!',
			button_rolling_msg: 'Girando...'
		}
    };
    constructor(props) {
        super(props);
        this.state = {
            rolling: false,
            quantity: 0,
            result: 0,
            diceFaces: []
        };
        this.roll = this.roll.bind(this);
        this.howMuch = this.howMuch.bind(this);
        this.calculateResult = this.calculateResult.bind(this);
    };
    roll(e) {
        let arr = [];
        while (arr.length < this.state.quantity) {
            arr.push(this.props.faces[this.props.generateRandomIndex()]);
        }
        let total = this.calculateResult(arr);
        this.setState({
            diceFaces: arr, 
            rolling: true,
            result: 0
        });
        let dice = Array.from(e.currentTarget.previousSibling.children);
        dice.forEach(die => {
            die.classList.add('rolling');
            setTimeout(() => {
                die.classList.remove('rolling');
                this.setState({
                    rolling: false,
                    result: total
                });
            }, 500);
        });
    }
    howMuch(e) {
        let amount = Number(e.currentTarget.value);
        let arr = [];
        while (arr.length < amount) {
            arr.push(this.props.faces[this.props.generateRandomIndex()]);
        }
        let total = this.calculateResult(arr);
        this.setState({
            diceFaces: arr, 
            quantity: amount,
            result: total
        });
    }
    calculateResult(arr) {
        if (arr.length === 0) return;
        let total = 0;
        let points = this.props.points;
        let faces = this.props.faces;
        arr.forEach(face => total += points[faces.indexOf(face)]);
        return total;
    }
    render() {
        let diceDivs = [];
        for (let i = 0; i < this.state.quantity; i++) {
            diceDivs.push(<Die key={i + 1} face={this.state.diceFaces[i]} />);
        }
		let result = this.state.result;
		let msgs = this.props[this.props.lang];
        return (
            <div className="Board">
                <p>
                    {msgs.choose_msg} 
                    <select defaultValue={msgs.select_text} className="Board-select" onChange={this.howMuch}>
                        <option disabled>
                            {msgs.select_text}
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </p>
                { !result ? <p>&#10240;</p>
                : <p>{msgs.dice_result} {result}</p> }
                <div className="Board-container">
                    {diceDivs}
                </div>
                { !this.state.quantity ? ''
                    : this.state.rolling 
                    ? <button className="Board-button rolling" disabled>{msgs.button_rolling_msg}</button>
                    : <button className="Board-button" onClick={this.roll}>{msgs.button_msg}</button>
                }
            </div>
        )
    }
}

export default Board;