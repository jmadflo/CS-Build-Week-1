import React from 'react'

const Controls = props => {
    const onStart = () => {
        props.setIsRunning(!props.isRunning)
        props.runRef.current = true
        if (props.isRunning === false) {
            props.runGame()
        }
    }
    return (
        <div>
            <button className='start-button' onClick={() => onStart()}>{props.isRunning ? 'Stop' : 'Start'}</button>
        </div>
    )
}

export default Controls