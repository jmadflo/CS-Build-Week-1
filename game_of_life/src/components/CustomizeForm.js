import React from 'react'
import { StyledButton } from './styled-components'

const CustomizeForm = props => {
    const updateDimensions = event => {
        props.setIsRunning(false)
        props.setFormValues({
            ...props.formValues,
            [event.target.name]: event.target.value
        })
    }
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
            {/* <InputContainer> */}
                <div>
                    <div>
                        <label htmlFor='rowQuantity'>Row Quantity</label>
                    </div>
                    <input id= 'rowQuantity' name='rowQuantity' value={props.formValues.rowQuantity} onChange={updateDimensions}/>
                </div>
                <div>
                    <div>
                        <label htmlFor='colQuantity'>Column Quantity</label>
                    </div>
                    <input id= 'colQuantity' name='colQuantity' value={props.formValues.colQuantity} onChange={updateDimensions}/>
                </div>
            {/* </InputContainer> */}
            
            <StyledButton color='red' onClick={applyChanges}>Change Size</StyledButton>
        </form>
    )
}

export default CustomizeForm