import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Player from './components/Player/Player'
import GameBoard from './components/GameBoard/GameBoard'
import Log from './components/Log/Log'
import { WINNING_COMBINATIONS } from './winning-combinations'
import Modal from './components/Modal/Modal'


const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function derivedGameBoard(gameTurns)
{
  let gameBoard = [...initialGameBoard.map(array => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function derivedActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = '0';
  }
  return currentPlayer;
}

function deriveWinner(gameBoard,players)
{
  let winner = null;
 

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
  
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;

}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  //const [activePlayer, setActivePlayer] = useState('X');
  const activePlayer = derivedActivePlayer(gameTurns);

  const [players,setPlayers]=useState({
    X:'Player 1',
    Y:'Player 2'
  });
  const gameBoard=derivedGameBoard(gameTurns);
  let winner=deriveWinner(gameBoard,players)
  const hasDraw = gameTurns.length === 9 && !winner;
  function closeModal() {
    winner = null
  }


  function handSelectSquare({ rowIndex, colIndex }) {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? '0' : 'X'));
    setGameTurns((prevTurns) => {

      const currentPlayer = derivedActivePlayer(gameTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns
      ];
      console.log(gameTurns);
      return updatedTurns;
    });

  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol,newName)
  {
    setPlayers((prevPlayers)=>{
    return {
      ...prevPlayers,
      [symbol]:newName
    };
  });
  }
  return (

    <>
      <h1 className="font-bold text-2xl text-neutral-950">Welcome to TIC TAC TOE</h1>
      <div className="flex items-center justify-center">
        <div className="relative my-6 flex w-max flex  items-center justify-center flex-col rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
          <div className="w-full">
            <ul className="relative flex list-none flex-wrap rounded-md bg-black px-1.5 py-1.5" data-tabs="tabs" role="list">
              <li className="z-30 flex-auto text-center">
                <Player initialName="Player 1" symbol="X" onChangeName={handlePlayerNameChange} activePlayer={activePlayer === 'X' ? 'border-custom-purple border-2' : undefined} />
              </li>
              <li className="z-30 flex-auto text-center">
                <Player initialName="Player 2" symbol="0" onChangeName={handlePlayerNameChange} activePlayer={activePlayer === 'X' ? undefined : 'border-custom-purple border-2'} />

              </li>


            </ul>

            <div data-tab-content="" className="p-3">
              <div id="dashboard" role="tabpanel">
                <GameBoard onSelectSquare={handSelectSquare}  board={gameBoard} />
              </div>
              {(winner || hasDraw) && (
                <>
                  <p>You won, Player {winner}!</p>
                  <Modal winner={winner} onClose={closeModal}  onRestart={handleRestart} />
                </>
              )}


              <Log turns={gameTurns} />
            </div>
          </div>
        </div>
      </div >

    </>
  )
}

export default App
