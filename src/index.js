import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


//square represents rendering a single button
function Square(props) {
    //square does not have a constructor since it does not store state
    //square has two props (from board): value and onClick

    return ( //added an onClick javaScript function (needs to be in curly braces) 
        <button
            className="square"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );//since this.props.value is a javascript variable, we put it in curly braces. it's going to render as text in the button


}

//board represents three rows of squares (buttons)
class Board extends React.Component {

    constructor(props) {
        super(props);//In JavaScript classes, you need to always call super when defining the constructor of a subclass. All React component classes that have a constructor should start with a super(props) call.
        this.state = {//state is an object, right now it has one variable (squares) which is an array
            squares: Array(9).fill(null),   //this is how the board knows the 'fill' of each square
            xIsNext: true,
        };
    }
    //this.handleClick(i) from renderSquare function
    handleClick(i) {
        const squares = this.state.squares.slice(); //slice creates a copy of the array (all contents)

        if (calculateWinner(squares) || squares[i]) { //if there has already been a winner or the square is already filled
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          squares: squares,
          xIsNext: !this.state.xIsNext,
        });

    }

    renderSquare(i) {
        return (
          <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
          />
        );
      }//passing props: this function creates and returns a Square object with the prop 
        //The prop is the FILL that the BOARD REMEMBERS (in squares[]) and that is the value given to the square
        //remember that JSX is converting this tag into React.createElement('Square'...)
    

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
    
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
