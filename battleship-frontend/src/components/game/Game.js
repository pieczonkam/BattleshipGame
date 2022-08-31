import React, { useState, useEffect } from 'react';
import { useNavigate }                from 'react-router-dom'
import { FontAwesomeIcon }            from '@fortawesome/react-fontawesome';
import { faRotate }                   from '@fortawesome/free-solid-svg-icons';
import { Tooltip, Button }            from '@mui/material';

import ShipsContainer                 from './ShipsContainer';
import Ship                           from './Ship';
import BoardTile                      from './BoardTile'

import { BOARD_SIZE }                 from '../../utils/constants';
import { prepareBoardMap }            from '../../utils/utils';
import { switchNavLink }              from '../../utils/utils';

function Game(props) {
    const [ships_vertical, setShipsVertical]    = useState(false);
    const [board_map, setBoardMap]              = useState(prepareBoardMap(BOARD_SIZE));
    const [drag_over_update, setDragOverUpdate] = useState(true);
    const [opponent, setOpponent]               = useState(localStorage.getItem('opponent') ? localStorage.getItem('opponent') : '');

    const navigate = useNavigate();

    useEffect(() => {
        // if (!localStorage.getItem('opponent')) {
        //     navigate('/');
        // } else {
        //     switchNavLink('navlink-1');
        // }

        switchNavLink('navlink-1');
    }, []);

    const getBoard = type => {
        var board_tiles_arr = [];
        
        for (let i = 0; i < BOARD_SIZE + 1; ++i) {

            var board_tiles_row = [];
            for (let j = 0; j < BOARD_SIZE + 1; ++j) {
                if (type === 'a') {
                    board_tiles_row.push(<BoardTile type={type} x={i} y={j} key={'board-' + type + '-' + (i) + '-' + (j)} board_map={board_map} setBoardMap={setBoardMap} drag_over_update={drag_over_update} setDragOverUpdate={setDragOverUpdate}></BoardTile>)
                } else {
                    board_tiles_row.push(<BoardTile type={type} x={i} y={j} key={'board-' + type + '-' + (i) + '-' + (j)}></BoardTile>)
                }
            }

            board_tiles_arr.push(<div className='d-flex flex-row justify-content-center' key={'board-row-' + type + '-' + i}>{board_tiles_row}</div>);
        }
        
        return board_tiles_arr;
    }

    const startGame = () => {
        var opponent = localStorage.getItem('opponent');

        if (opponent) {
            props.sendPrivateMessage(opponent, 'Hello there');
        }

        // localStorage.setItem('your_move', getRandomInt(0, 2) === 0 ? 'false' : 'true');

        // if (document.getElementById('ship-container').childNodes.length > 0) {
        //     alert('Proszę rozmieścić wszystkie statki na planszy.');
        // } else if (opponent === '') {
        //     alert('Nie masz jeszcze przeciwnika. Poczekaj, aż dołączy do rozgrywki lub zaproś znajomego w zakładce Profil.');
        // }
    }

    return (
            <div className='d-flex flex-column align-items-center'>
                <div className='Game-container my-2'>
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
                        <span>
                            <span className='Game-board-title'>Statki przeciwnika</span>
                            <span className='Game-board-title-nickname'> ({opponent === '' ? '-' : opponent})</span>    
                        </span>
                        <div className='Game-board-b-outer'>
                            {getBoard('b')}
                        </div>
                    </div>
                </div>
                <span className='px-2 pt-2 pb-1'>
                    <Tooltip title=
                        'Przeciągnij statki z dolnego panelu na lewą planszę. Możesz obrócic statki w panelu klikając na przycisk "Obróć statki". Wciśnij start aby rozpocząć grę. Znajdź statki przeciwnika, klikając na pola na prawej planszy.'
                    placement='top'>
                        <Button>
                            Jak grać?
                        </Button>
                    </Tooltip>
                </span>
                <div className='d-flex flex-row'>
                    <button className='btn btn-primary mx-1 px-5 rounded-0' onClick={startGame}>
                        Start
                    </button>
                    <button className='btn btn-primary mx-1 px-3 rounded-0' onClick={() => setShipsVertical(!ships_vertical)}>
                        <FontAwesomeIcon icon={faRotate}/>
                        {' '}Obróć statki
                    </button>
                    <button className='btn btn-primary mx-1 px-5 rounded-0' onClick={() => window.location.reload(false)}>
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