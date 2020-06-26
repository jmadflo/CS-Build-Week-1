import React from 'react'
import templates from '../templates'
import { StyledButton, ButtonContainer} from './styled-components'

const Controls = props => {
    const onStart = () => {
        props.setIsRunning(!props.isRunning)
        props.runRef.current = true
        if (props.isRunning === false) {
            props.runGame()
        }
    }

    const clearBoard = () => {
        props.setIsRunning(false)
        props.setBoard(props.initializeBoard())
    }

    const oscillatorsTemplate = async () => {
        props.setIsRunning(false)
        await props.setRowNum(35)
        await props.setColNum(35)
        props.resetForm()
        props.setBoard(templates.oscillators)
    }

    const spaceshipsTemplate = async () => {
        props.setIsRunning(false)
        await props.setRowNum(35)
        await props.setColNum(35)
        props.resetForm()
        props.setBoard(templates.spaceships)
    }

    const randomizeBoard = () => {
        props.setIsRunning(false)
        props.setBoard(props.randomize())
    }
    return (
        <ButtonContainer>
            <StyledButton className='start-button' onClick={() => onStart()}>{props.isRunning ? 'Stop' : 'Start'}</StyledButton>
            <StyledButton className='clear-button' onClick={() => clearBoard()}>Clear</StyledButton>
            <StyledButton className='oscillators-button' onClick={() => oscillatorsTemplate()}>Oscillators Template</StyledButton>
            <StyledButton className='spaceships-button' onClick={() => spaceshipsTemplate()}>Spaceships Template</StyledButton>
            <StyledButton className='randomize-button' onClick={() => randomizeBoard()}>Randomize Board</StyledButton>
        </ButtonContainer>
    )
}

export default Controls