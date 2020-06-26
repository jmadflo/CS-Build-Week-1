import React from 'react'
import produce from 'immer'
import { Square, Grid } from './styled-components'

const GameBoard = props => {
    const toggleValue = (i, j) => {
        if (!props.isRunning && (i > 0 && i < props.rowNum - 1) && (j > 0 && j < props.colNum - 1)){
            const newBoard = produce(props.board, boardCopy => {
                boardCopy[i][j] = props.board[i][j] === 1 ? 0 : 1
            })
            props.setBoard(newBoard)
        }
    }

    return (
        <Grid cols={props.colNum}>
            {props.board.map((row, i) => 
                row.map((col, j) => {
                    return <Square key={`Row: ${i}, Col: ${j}`} value={ props.board[i][j] } onClick={() => toggleValue(i, j)}/>
                })
            )}
        </Grid>
    )
}

export default GameBoard