import React, { useState }     from 'react';
import { FontAwesomeIcon }     from '@fortawesome/react-fontawesome';
import { faRotate }            from '@fortawesome/free-solid-svg-icons';

import ShipsContainer          from './ShipsContainer';
import Ship                    from './Ship';
import BoardTile               from './BoardTile'

import { BOARD_SIZE }          from '../../utils/constants';
import { prepareBoardMap }     from '../../utils/utils';

function Game() {
    const [ships_vertical, setShipsVertical] = useState(false);
    const [board_map, setBoardMap]           = useState(prepareBoardMap(BOARD_SIZE));

    const getBoard = type => {
        var board_tiles_arr = [];
        
        for (let i = 0; i < BOARD_SIZE + 1; ++i) {

            var board_tiles_row = [];
            for (let j = 0; j < BOARD_SIZE + 1; ++j) {
                if (type === 'a') {
                    board_tiles_row.push(<BoardTile type={type} x={i} y={j} key={'board-' + type + '-' + (i) + '-' + (j)} board_map={board_map} setBoardMap={setBoardMap}></BoardTile>)
                } else {
                    board_tiles_row.push(<BoardTile type={type} x={i} y={j} key={'board-' + type + '-' + (i) + '-' + (j)}></BoardTile>)
                }
            }

            board_tiles_arr.push(<div className='d-flex flex-row justify-content-center' key={'board-row-' + type + '-' + i}>{board_tiles_row}</div>);
        }
        
        return board_tiles_arr;
    }

    return (
            <div className='d-flex flex-column align-items-center'>
                <div className='Game-container my-4'>
                    <div className='Game-board-a d-flex flex-column align-items-center text-bold'>
                        <span className='Game-board-title'>Twoje statki</span>
                        <div className='Game-board-a-outer'>
                            <div className='Game-board-a-inner-bottom'>
                                {getBoard('a-bg')}
                            </div>
                            <div className='Game-board-a-inner-top'>
                                {getBoard('a')}
                            </div>
                        </div>
                    </div>
                    <div className='Game-board-b d-flex flex-column align-items-center text-bold'>
                        <span className='Game-board-title'>Statki przeciwnika</span>
                        {getBoard('b')}                
                    </div>
                </div>
                <div className='d-flex flex-row'>
                    <button className='btn btn-primary mx-1 mt-5 px-5' onClick={() => console.log('Start!')}>
                        Start
                    </button>
                    <button className='btn btn-primary mx-1 mt-5 px-3' onClick={() => setShipsVertical(!ships_vertical)}>
                        <FontAwesomeIcon icon={faRotate}/>
                        {' '}Obróć statki
                    </button>
                    <button className='btn btn-primary mx-1 mt-5 px-5' onClick={() => window.location.reload(false)}>
                        Reset
                    </button>
                </div>
                <ShipsContainer id='ship-container' className={ships_vertical ? 'Game-ships-container-vertical' : 'Game-ships-container-horizontal'} vertical={ships_vertical}>
                    <Ship id='ship-1' key='ship-1' className={ships_vertical ? 'Game-ship ship-4-vertical' : 'Game-ship ship-4-horizontal'} draggable='true' />
                    <Ship id='ship-2' key='ship-2' className={ships_vertical ? 'Game-ship ship-3-vertical' : 'Game-ship ship-3-horizontal'} draggable='true' />
                    <Ship id='ship-3' key='ship-3' className={ships_vertical ? 'Game-ship ship-2-vertical' : 'Game-ship ship-2-horizontal'} draggable='true' />
                    <Ship id='ship-4' key='ship-4' className={ships_vertical ? 'Game-ship ship-2-vertical' : 'Game-ship ship-2-horizontal'} draggable='true' />
                    <Ship id='ship-5' key='ship-5' className={ships_vertical ? 'Game-ship ship-1-vertical' : 'Game-ship ship-1-horizontal'} draggable='true' />
                </ShipsContainer>
            </div>
    );
}

export default Game;