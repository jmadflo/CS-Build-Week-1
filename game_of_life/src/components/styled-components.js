import styled from 'styled-components'
export const Square = styled.div`
    width: 15px;
    height: 15px;
    border: 1px solid black;
    background-color:${props => props.value ? 'blue' : 'white'};
`
export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.cols}, 15px);
    margin-right: 8%;
`
export const StyledButton = styled.button`
    background-color: ${props => props.color ? props.color : '#2D88FF'};
    color: white;
    font-size: 1rem;
    border: 2px solid white;
    border-radius: 10px;
    cursor: pointer;
    margin: 2px;
    padding: 5px;
    width: 150px;
`
export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
`

export const GameContainer = styled.div`
    display: flex;
    margin: 10px 0;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    margin-right: 4%;
`