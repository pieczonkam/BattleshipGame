import React from 'react';

import Board  from './Board'
import Boat   from './Boat'
// import Square from './Square'

function Game() {
    // const onSquareClick = id => {
    //     let square = document.getElementById(id);
    //     square.style.backgroundColor = 'blue';
    //     square.style.border = '2px solid darkblue';

    // }

    // const drawSquares = size => {
    //     let squares = [];
    //     for (let i = 0; i < size.x; ++i) {
    //         let squares_row = [];
    //         for (let j = 0; j < size.y; ++j) {
    //             squares_row.push(<Square id={'square_' + (i * size.y + j)} className='square' onClick={() => onSquareClick('square_' + (i * size.y + j))}>{'\u00A0'}</Square>);
    //         }
    //         squares.push(<div>{squares_row}</div>);
    //     }

    //     console.log(squares);

    //     return squares;
    // }

    return (
        <div className='Game-container my-4 d-flex flex-column flex-sm-row'>
            <Board id='board-1' className='Game-board'>
                <Boat id='boat-1' className='Game-boat boat-1' draggable='true' />
                <Boat id='boat-2' className='Game-boat boat-2' draggable='true' />
                <Boat id='boat-3' className='Game-boat boat-3' draggable='true' />
                <Boat id='boat-4' className='Game-boat boat-4' draggable='true' />
            </Board>

            <Board id='board-2' className='Game-board'>
                <Boat id='boat-5' className='Game-boat boat-3' draggable='true' />
            </Board>
        </div>

        // <div>
        //  {drawSquares({x: 10, y: 30})}
        // </div>
      
    );
}

export default Game;