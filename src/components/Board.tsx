import React, { useState } from "react"
import { Square } from "./Square"

interface Props {
    boardSize: number
}

export const Board: React.FC<Props> = ({ boardSize }) => {
    
    const [ squares, setSquares ] = useState<Array<string>>(Array(boardSize*boardSize).fill(null))
    const [ isPlayerXNext,  setIsPlayerXNext ] = useState<boolean>(true) 

    const styles = {
        border: '4px solid black',
        borderRadius: '10px',
        // height: '250px',
        // width: '250px',
        margin: '0 auto',
        display: 'grid',
        gridGap: '0px',
        gridColumnGap: '0px',
        gridRowGap: '0px',
        gridTemplate: `repeat(${boardSize}, 1fr) / repeat(${boardSize}, 1fr)` 
    }


    // to check whether the game is over and someone has won or not.

    function checkWinner(): string {
        
        // check whether there is any row with winning configuration

        for(let row=0;row<boardSize;row++) {
            // get index from 2-D to 1-D: index = x*num_cols + y            
            let last = squares[row*boardSize]
            let win = true

            for(let col=0;col<boardSize;col++) {
                let index = row*boardSize + col
                let current = squares[index]

                if(current !== last) {
                    win = false
                    break
                }
                last = current
            }

            if(win) {
                return last
            }
        }

        // check whether there is any column with winning configuration

        for(let col=0;col<boardSize;col++) {
            // get index from 2-D to 1-D: index = x*num_cols + y            
            let last = squares[col]
            let win = true

            for(let row=0;row<boardSize;row++) {
                let index = row*boardSize + col
                let current = squares[index]

                if(current !== last) {
                    win = false
                    break
                }
                last = current
            }

            if(win) {
                return last
            }
        }


        // check whether any of the two diagonals have winning configuration

        let row = 0, col = 0
        let last = squares[row*boardSize+col]
        let win = true

        for(let i=0;i<boardSize;i++) {
            let index = row*boardSize + col
            let current = squares[index]

            if(current != last) {
                win = false
                break
            }

            last = current
            row++
            col++
        }

        if(win) {
            return last
        }

        row = 0
        col = boardSize-1
        last = squares[row*boardSize+col]
        win = true

        for(let i=0;i<boardSize;i++) {
            let index = row*boardSize + col
            let current = squares[index]

            if(current != last) {
                win = false
                break
            }

            last = current
            row++
            col--
        }

        if(win) {
            return last
        }
        
        for(let i=0; i<boardSize;i++) {
            if(squares[i] !== 'X' && squares[i] !== 'O') {
                return ""
            }
        }

        return "tie"
    }


    function handleClick(i: number): void {
        const cells = squares.slice()
        if(checkWinner() || cells[i])
            return
        cells[i] = isPlayerXNext? "X":"O"
        setSquares(cells)
        setIsPlayerXNext(!isPlayerXNext)
    }

    function renderSquares(boardSize: number): any[] {
        const squareComponents = []
        for(let i=0;i<boardSize*boardSize;i++) {
            squareComponents.push(<Square handleClick={() => {handleClick(i)}} key={i} value={squares[i]} />)
        }
        return squareComponents
    }
    
    function reset() {
        setSquares(Array(boardSize*boardSize).fill(null))
        setIsPlayerXNext(true) 
    }


    let status
    const winner = checkWinner()
    
    if(winner == "tie") {
        status = "Game is finished. It's a tie!"
    } else if(winner) {
        status = "Game is finished. Player " + winner + " is the winner."
    } else {
        status = "Game is ongoing. Player " + (isPlayerXNext? "X" : "O") + "'s turn."
    }


    return (
        <div>
            <div className="status">{status}</div>
            <div className="board" style={styles}>
                { renderSquares(boardSize) }
            </div><br/><br/>
            <button className="reset" onClick={reset}>
                Reset the Game.
            </button><br/><br/>
        </div>
    )
}