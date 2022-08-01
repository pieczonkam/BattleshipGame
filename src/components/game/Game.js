import React from 'react';
import Board from './Board'
import Card from './Card'
import Square from './Square'

function Game() {
    const drawSquares = size => {
        let squares = [];
        for (let i = 0; i < size.x; ++i) {
            let squares_row = [];
            for (let j = 0; j < size.y; ++j) {
                squares_row.push(<Square id={'square_' + (i * 5 + j)} className='square'><span>{i * 5 + j}</span></Square>);
            }
            squares.push(<div>{squares_row}</div>);
        }

        console.log(squares);

        return squares;
    }

    return (
        // <main className='flexbox'> 
        //     <Board id='board-1' className='board'>
        //         <Card id='card-1' className='card' draggable='true'>
        //             <p>Card one</p>
        //         </Card>
        //         <Card id='card-2' className='card' draggable='true'>
        //             <p>Card two</p>
        //         </Card>
        //         <Card id='card-3' className='card' draggable='true'>
        //             <p>Card three</p>
        //         </Card>
        //     </Board>

        //     <Board id='board-2' className='board'>
        //         <Card id='card-4' className='card' draggable='true'>
        //             <p>Card four</p>
        //         </Card>
        //     </Board>
        // </main>

        <div>
         {drawSquares({x: 10, y: 30})}
        </div>
      
    );
}

export default Game;