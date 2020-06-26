import React from 'react'

const NavBar = () => {
    return (
        <nav>
            <h1>Conway's Game of Life</h1>
            <a href="#rules">
                <p>Rules</p>
            </a>
            <a href="https://github.com/jmadflo/CS-Build-Week-1">
                <p>Code Repository</p>
            </a>
            <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
                <p>More Game Information</p>
            </a>
        </nav>
    )
}

export default NavBar