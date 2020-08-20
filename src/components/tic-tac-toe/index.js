import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className={'square ' + props.class} onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  render() {
    return (
      <div>
        {
          [0, 1, 2].map(row => {
            return (
              <div className="board-row" key={row}>
                {
                  [0 + row * 3, 1 + row * 3, 2 + row * 3].map(item => {
                    return (
                      <Square
                        key={item}
                        class={this.props.sedItems.includes(item) ? 'sed-item' : ''}
                        value={this.props.squares[item]}
                        onClick={() => this.props.onClick(item)} />
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        index: null
      }],
      stepNumber: 0,
      xIsNext: true,
      isUp: true
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        index: i
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    }, () => {
      if (!calculateWinner(squares) && squares.every(item => item)) {
        console.log('本局平局');
      }
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winnerPath = calculateWinner(current.squares);

    let moves = history.map((step, move) => {
      const desc = move ?
        ('Go to move #' + move + '（' + Math.floor(step.index / 3) + '，' + step.index % 3 + '）') :
        'Go to game start';
      return (
        <li key={move}>
          <button
            className={this.state.stepNumber === move ? 'sed-btn' : ''}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      )
    });
    moves = this.state.isUp ? moves : moves.reverse();

    let status;
    if (winnerPath) {
      status = 'Winner: ' + current.squares[winnerPath[0]];
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            sedItems={winnerPath || []}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>
            {status}
            <button
              className="order-btn"
              onClick={() => this.setState({ isUp: !this.state.isUp })}
            >
              {this.state.isUp ? '降序' : '升序'}
            </button>
          </div>
          <ol>{moves}</ol>
        </div>
      </div >
    );
  }
}

// ========================================
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
      return lines[i];
    }
  }
  return null;
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
