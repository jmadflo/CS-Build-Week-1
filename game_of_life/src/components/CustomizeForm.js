import React from 'react'
import { StyledButton } from './styled-components'

const CustomizeForm = props => {
    const updateFormValues = event => {
        props.setIsRunning(false)
        props.setFormValues({
            ...props.formValues,
            [event.target.name]: event.target.value
        })
    }
    const changeSpeed = event => {
        event.preventDefault()
        const newSpeed = Number(props.formValues.speed)
        if (newSpeed > 0 && newSpeed <= 10) {
            props.setSpeed(Number(props.formValues.speed))
        } else {
            alert('The speed value must be an integer or float greater than 0 and less than or equal to 10.')
        }
    }
    // makes changes to the dimensions of the board
    const applyChanges = async event => {
        event.preventDefault()
        if (!props.isRunning) {
            const rowQuantity = parseInt(props.formValues.rowQuantity)
            const colQuantity = parseInt(props.formValues.colQuantity)
            if (Number.isInteger(rowQuantity) && Number.isInteger(colQuantity)) {
                await props.setRowNum(rowQuantity)
                await props.setColNum(colQuantity)
                props.setBoard(props.initializeBoard())
            } else {
                alert("The values of the inputs labeled Row Quantity and Column Quantity must be integers")
            }
        } else {
            alert("Stop the current game in order to change the board size.")
        }
    }
    return (
        <form>
            <div className='dimension'>
                <div>
                    <label htmlFor='rowQuantity'>Row Quantity</label>
                </div>
                <input id= 'rowQuantity' name='rowQuantity' value={props.formValues.rowQuantity} onChange={updateFormValues}/>
            </div>
            <div className='dimension'>
                <div>
                    <label htmlFor='colQuantity'>Column Quantity</label>
                </div>
                <input id= 'colQuantity' name='colQuantity' value={props.formValues.colQuantity} onChange={updateFormValues}/>
            </div>
            <StyledButton color='red' onClick={applyChanges}>Change Size</StyledButton>
            <div className='speed-input dimension'>
                <div>
                    <label htmlFor='speed'>Speed (Executions Per Second)</label>
                </div>
                <input id= 'speed' name='speed' value={props.formValues.speed} onChange={updateFormValues}/>
            </div>
            <StyledButton color='green' onClick={changeSpeed}>Alter Speed</StyledButton>
        </form>
    )
}

export default CustomizeForm