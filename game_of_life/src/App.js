import React, { useState, useRef } from 'react'
import produce from 'immer'
import './App.css'
import GameBoard from './components/GameBoard'
import Controls from './components/Controls'
import CustomizeForm from './components/CustomizeForm'
import { GameContainer } from './components/styled-components'
import NavBar from './components/NavBar'

function App() {
  const [rowNum, setRowNum] = useState(35)
  const rowNumRef = useRef(rowNum)
  rowNumRef.current = rowNum

  const [colNum, setColNum] = useState(35)
  const colNumRef = useRef(colNum)
  colNumRef.current = colNum

  const [currentGeneration, setCurrentGeneration] = useState(0)

  const initializeBoard = () => {
    const rows = []
    // initialize the board by adding an array of all zeros of length equal to the number of columns for each row.
    for (let i = 0; i < parseInt(rowNumRef.current); i++){
      rows.push(Array.from(Array(parseInt(colNumRef.current)), () => 0))
    }
    setCurrentGeneration(0)
    return rows
  }

  const randomize = () => {
    const rows = []
    for (let i = 0; i < rowNum; i++){
      rows.push(Array.from(Array(colNum), () => Math.floor(Math.random() * 2)))
    }
    return rows
  }

  const [board, setBoard] = useState(() => initializeBoard())

  const [isRunning, setIsRunning] = useState(false)

  const isRunningRef = useRef(isRunning)
  isRunningRef.current = isRunning

  const runGame = () => {
    // console.log('running game')
    if (!isRunningRef.current){
      return
    }
    setBoard(prevBoard => {
      return produce(prevBoard, boardCopy => {
        for (let i = 0; i < parseInt(rowNumRef.current); i++) {
          for (let j = 0; j < parseInt(colNumRef.current); j++) {
            // Count number of neighbors that each square has
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
    setCurrentGeneration(prevGeneration => {
      return prevGeneration + 1
    })
    setTimeout(runGame, 100)
  }

  const [formValues, setFormValues] = useState({
    rowQuantity: rowNum,
    colQuantity: colNum
  })

  const resetForm = () => {
    setFormValues({
      rowQuantity: 35,
      colQuantity: 35
    })
  }

  return (
    <div className="App">
      <NavBar />
      <h2>Implementation By Juan Madero</h2>
      <GameContainer>
        <GameBoard board={board} setBoard={setBoard} rowNum={rowNum} colNum={colNum} isRunning={isRunning}/>
        <CustomizeForm isRunning={isRunning} setIsRunning={setIsRunning} rowNum={rowNum} colNum={colNum} setRowNum={setRowNum} setColNum={setColNum} setBoard={setBoard} initializeBoard={initializeBoard} formValues={formValues} setFormValues={setFormValues}/>
      </GameContainer>
      <p>{`Current Generation: ${currentGeneration}`}</p>
      <Controls isRunning={isRunning} setIsRunning={setIsRunning} runGame={runGame} resetForm={resetForm} setBoard={setBoard} initializeBoard={initializeBoard} randomize={randomize} runRef={isRunningRef} setRowNum={setRowNum} setColNum={setColNum} setCurrentGeneration={setCurrentGeneration}/>
      <h2 id="rules">The Rules</h2>
      <ol>
        <li>Live cells with 2 or 3 neighbors survive to the next generation.</li>
        <li>Dead cells with 3 neighbors will become alive in the next generation.</li>
        <li>All other cells will be dead in the next generation.</li>
      </ol>
      <h2>The Algorithm</h2>
      <p>The algo</p>
    </div>
  )
}

export default App
