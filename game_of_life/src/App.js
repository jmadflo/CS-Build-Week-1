import React, { useState, useRef, useCallback } from 'react'
import produce from 'immer'
import './App.css'
import GameBoard from './components/GameBoard'
import Controls from './components/Controls'

function App() {
  const rowNum = 35
  const colNum = 35
  const [board, setBoard] = useState(()=> {
    const rows = []
    // initialize the board by adding an array of all zeros of length equal to the number of columns for each row.
    for (let i = 0; i < rowNum; i++){
      rows.push(Array.from(Array(colNum), () => 0))
    }
    return rows
  })

  const [isRunning, setIsRunning] = useState(false)

  const isRunningRef = useRef(isRunning)
  isRunningRef.current = isRunning

  const runGame = useCallback(() => {
    console.log('running game')
    if (!isRunningRef.current){
      return
    }
    setBoard(prevBoard => {
      console.log(prevBoard)
      return produce(prevBoard, boardCopy => {
        for (let i = 0; i < rowNum; i++) {
          console.log(i)
          for (let j = 0; j < colNum; j++) {
            let neighborNum = 0
            for (let neighborRow = -1; neighborRow < 2; neighborRow++){
              for (let neighborCol = -1; neighborCol < 2; neighborCol++){
                const newRow = neighborRow + i
                const newCol = neighborCol + j
                if (newRow >= 0 && newRow < rowNum && newCol >= 0 && newCol < colNum && (neighborRow !== 0 || neighborCol !== 0)){
                  neighborNum += prevBoard[newRow][newCol]
                }
              }
            }
            
            // if the number of neighbors is not 2 or 3 then the square at row i and col j is 0. If it is 2 or 3 then it is 1
            if ((neighborNum < 2 || neighborNum > 3) && prevBoard[i][j] === 1){
              boardCopy[i][j] = 0
            } else if (neighborNum === 3 && prevBoard[i][j] === 0){
              boardCopy[i][j] = 1
            }
          }
        }
      })
    })
    setTimeout(runGame, 200)
  }, [])

  return (
    <div className="App">
      <GameBoard board={board} setBoard={setBoard} rowNum={rowNum} colNum={colNum}/>
      <Controls isRunning={isRunning} setIsRunning={setIsRunning} runGame={runGame} runRef={isRunningRef}/>
    </div>
  )
}

export default App
