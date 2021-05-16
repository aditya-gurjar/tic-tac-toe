import React, { useState } from 'react';
import './App.css';
import { Board } from './components/Board'

function App() {  

  const [ tempSize, setTempSize ] = useState<string | null>(null)
  const [ boardSize, setBoardSize ] = useState<number>(0)
  const [ startGame, setStartGame ] = useState<boolean>(false)

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    e.preventDefault()
    setBoardSize(Number(tempSize))
    setStartGame(true)
  }


  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1> 

      {
        startGame ?
        <div className="board">
          <Board boardSize={boardSize}/>
        </div>
        :
        <p>Choose the board size to begin the game.</p>
      }

      <label>Enter board size: </label>

      <input 
        type="text"
        placeholder="Enter a number...."
        id="board-size"
        onChange={(e) => {setTempSize(e.target.value)}}
        />
      <br/><br/>

      <button 
        type="submit"
        onClick={(e) => handleSubmit(e)}
        className="input-button">
        Start a new game
      </button>

    </div>
  )
}

export default App
