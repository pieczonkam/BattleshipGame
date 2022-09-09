import React, { useState, useEffect } from 'react';
import { useNavigate }                from 'react-router-dom';
import { FontAwesomeIcon }            from '@fortawesome/react-fontawesome';
import { faRotate,
        faRotateRight,
        faPlay,
        faFlag }                      from '@fortawesome/free-solid-svg-icons';
import { Tooltip, Button }            from '@mui/material';

import ShipsContainer                 from './ShipsContainer';
import Ship                           from './Ship';
import BoardTile                      from './BoardTile';

import { BOARD_SIZE }                 from '../../utils/constants';
import { clearGameData, 
        prepareBoardMap }             from '../../utils/utils';
import { switchNavLink }              from '../../utils/utils';

function Game(props) {
    const [ships_vertical_state, setShipsVerticalState] = useState(false);
    const [drag_over_update, setDragOverUpdate]         = useState(true);
    const [ships_horizontal, setShipsHorizontal]        = useState([]);
    const [ships_vertical, setShipsVertical]            = useState([]);
    const [ships_on_board, setShipsOnBoard]             = useState([]);
    const [all_ships_placed, setAllShipsPlaced]         = useState(null);
    const [surrender_screen, setSurrenderScreen]        = useState(false);
    const [not_your_move_screen, setNotYourMoveScreen]  = useState(false);
    const [game_over, setGameOver]                      = useState(false);
    const [game_started, setGameStarted]                = useState(localStorage.getItem('game_started') === 'true' ? true : false);
    const [winner, setWinner]                           = useState(1);

    const navigate = useNavigate();

    useEffect(() => {  
        const setShipsUE = () => {
            var ships_id             = ['ship-1', 'ship-2', 'ship-3', 'ship-4', 'ship-5'];
            var ships_class          = ['ship-4', 'ship-3', 'ship-2', 'ship-2', 'ship-1'];
            var ships_horizontal_arr = [];
            var ships_vertical_arr   = [];
            var ships_on_board_arr   = [];
            var board_map            = JSON.parse(localStorage.getItem('board_map'));
            var ships_set            = JSON.parse(localStorage.getItem('ships_set'));
            
            if (!board_map) {
                board_map = prepareBoardMap(BOARD_SIZE);
            }
            if (!ships_set) {
                ships_set = [];
            }

            var ships_set_id         = []; 
            var ships_set_parameters = [];

            for (let i = 0; i < ships_set.length; ++i) {
                ships_set_id.push(ships_set[i].split('|')[0]);
                ships_set_parameters.push(ships_set[i].split('|')[1]);
            }

            for (let i = 0; i < ships_id.length; ++i) {
                if (!ships_set_id.includes(ships_id[i])) {
                    ships_horizontal_arr.push(<Ship id={ships_id[i]} key={ships_id[i]} className={'Game-ship ' + ships_class[i] + '-horizontal'} draggable='true' />);
                    ships_vertical_arr.push(<Ship id={ships_id[i]} key={ships_id[i]} className={'Game-ship ' + ships_class[i] + '-vertical'} draggable='true' />);
                } else {
                    var ship_parameters  = ships_set_parameters[ships_set_id.indexOf(ships_id[i])];
                    var ship_length      = parseInt(ship_parameters.split(' ')[0]);
                    var ship_orientation = ship_parameters.split(' ')[1];
                    var tile_row         = parseInt(ship_parameters.split(' ')[2]);
                    var tile_col         = parseInt(ship_parameters.split(' ')[3]);

                    ships_on_board_arr.push({row: tile_row, col: tile_col, ship: <Ship id={ships_id[i]} key={ships_id[i]} className={'Game-ship-set ' + ships_class[i] + '-' + ship_orientation} />});
                
                    var row_size = ship_orientation === 'horizontal' ? 0 : (ship_length - 1);
                    var col_size = ship_orientation === 'horizontal' ? (ship_length - 1) : 0;
            
                    for (let m = tile_row - 2; m <= tile_row + row_size; ++m) {
                        for (let n = tile_col - 2; n <= tile_col + col_size; ++n) {
                            if (m >= 0 && m < BOARD_SIZE && n >= 0 && n < BOARD_SIZE) {
                                if ((m >= tile_row - 1 && m <= tile_row + row_size - 1) && (n >= tile_col - 1 && n <= tile_col + col_size - 1)) {
                                    board_map[m][n] = 2;
                                } else {
                                    board_map[m][n] = 1;
                                }
                            }
                        }
                    }
                }
            }

            setShipsHorizontal(ships_horizontal_arr);
            setShipsVertical(ships_vertical_arr);
            setShipsOnBoard(ships_on_board_arr);
            localStorage.setItem('board_map', JSON.stringify(board_map));
        }
    
        setShipsUE();
        switchNavLink('navlink-1');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log('Message status changed');
    }, [props.message_status]);

    const getBoard = (type) => {
        var board_tiles_arr = [];
        for (let i = 0; i < BOARD_SIZE + 1; ++i) {
            var board_tiles_row = [];
            for (let j = 0; j < BOARD_SIZE + 1; ++j) {
                if (type === 'a') {
                    var ship = ships_on_board.find(sob => sob.row === i && sob.col === j);
                    if (ship) {
                        board_tiles_row.push(
                            <BoardTile type={type} x={i} y={j} key={'board-' + type + '-' + (i) + '-' + (j)} drag_over_update={drag_over_update} setDragOverUpdate={setDragOverUpdate} sendWsMessage={props.sendWsMessage}>
                                {ship.ship}
                            </BoardTile>
                        );
                    } else {
                        board_tiles_row.push(<BoardTile type={type} x={i} y={j} key={'board-' + type + '-' + (i) + '-' + (j)} drag_over_update={drag_over_update} setDragOverUpdate={setDragOverUpdate} sendWsMessage={props.sendWsMessage}></BoardTile>);
                    }
                } else {
                    board_tiles_row.push(<BoardTile type={type} x={i} y={j} key={'board-' + type + '-' + (i) + '-' + (j)} sendWsMessage={props.sendWsMessage}></BoardTile>);
                }
            }

            board_tiles_arr.push(<div className='d-flex flex-row justify-content-center' key={'board-row-' + type + '-' + i}>{board_tiles_row}</div>);
        }
        
        return board_tiles_arr;
    }

    const startGame = () => {
        var opponent = localStorage.getItem('opponent');

        if (opponent) {
            if (document.getElementById('ships-container').childNodes.length > 0) {
                setAllShipsPlaced(false);
            } else {
                props.sendWsMessage(opponent, '', 'READY');
                localStorage.setItem('you_ready', 'true');

                localStorage.setItem('your_move', 'true');
                localStorage.setItem('game_started', 'true');
                setGameStarted(true);
            }
        } else {
            clearGameData();
            navigate('/profile');
        }
    }

    const surrender = () => {
        // Info dla drugiego gracza
        // Zresetowanie ustawień gry
        // Zapisanie gry w historii

        clearGameData();
        navigate('/profile');
    }

    const resetShips = () => {
        localStorage.removeItem('ships_set');
        localStorage.removeItem('board_map');
        localStorage.removeItem('your_hits_map');
        localStorage.removeItem('opponent_hits_map');
        window.location.reload(false);
    }

    return (
            <div className='Game-layers-container'>
                <div className='Game-content-layer'>
                    <div className='d-flex flex-column align-items-center'>
                        <div className='Game-container my-2'>
                            <div className='Game-board-a d-flex flex-column align-items-center text-bold'>
                                <span className='Game-board-title'>Twoje statki "{props.message_status}"</span>
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
                                    <span className='Game-board-title-nickname'> ({localStorage.getItem('opponent')  ? localStorage.getItem('opponent') : ''})</span>
                                </span>
                                <div className='Game-board-b-outer'>
                                    {getBoard('b')}
                                </div>
                            </div>
                        </div>
                        {
                            !game_started ?
                            <>
                                 <span className='px-2 pt-2 pb-1'>
                                    <Tooltip title=
                                        {<p style={{fontSize: '16px', padding: '10px 10px 0 10px'}}>
                                            Przeciągnij statki z dolnego panelu na planszę <b>Twoje statki</b>.
                                            <br/><br/>Możesz obrócić statki w panelu klikając na przycisk <b><FontAwesomeIcon icon={faRotate}/> Obróć statki</b>.
                                            <br/><br/>Wciśnij <b><FontAwesomeIcon icon={faPlay}/> Start</b> aby rozpocząć grę.
                                            <br/><br/>Znajdź statki przeciwnika, klikając na pola na planszy <b>Statki przeciwnika</b>.
                                            <br/><br/>Aby zresetować pozycje statków, kliknij przycisk <b><FontAwesomeIcon icon={faRotateRight}/> Reset</b>.
                                        </p>}
                                    placement='top'>
                                        <Button>
                                            Jak grać?
                                        </Button>
                                    </Tooltip>
                                </span>
                                <div className='d-flex flex-row'>
                                    <button className='Game-button-short btn btn-primary mx-1 rounded-0' onClick={() => setShipsVerticalState(!ships_vertical_state)}>
                                        <FontAwesomeIcon icon={faRotate}/>
                                        {' '}Obróć statki
                                    </button>
                                    <button className='Game-button-long btn btn-success mx-1 rounded-0' onClick={startGame}>
                                        <FontAwesomeIcon icon={faPlay}/>
                                        {' '}Start
                                    </button>    
                                    <button className='Game-button-short btn btn-primary mx-1 rounded-0' onClick={resetShips}>
                                        <FontAwesomeIcon icon={faRotateRight}/>
                                        {' '}Reset
                                    </button>
                                </div>
                                {
                                    ships_vertical_state ?
                                    <ShipsContainer id='ships-container' className='Game-ships-container-vertical'>
                                    {
                                        ships_vertical.map(ship => {
                                            return (ship);
                                        })
                                    }
                                    </ShipsContainer> :
                                    <ShipsContainer id='ships-container' className='Game-ships-container-horizontal'>
                                    {
                                        ships_horizontal.map(ship => {
                                            return (ship);
                                        })
                                    }
                                    </ShipsContainer>
                                }
                            </> :
                            <>
                                {
                                    localStorage.getItem('your_move') === 'true' ?
                                    <div>Twój ruch</div> :
                                    <div>Ruch przeciwnika</div>
                                }
                                <div className='d-flex flex-row'>
                                    <button className='Game-button-long btn btn-danger mx-1 rounded-0' onClick={() => setSurrenderScreen(true)}>
                                        <FontAwesomeIcon icon={faFlag}/>
                                        {' '}Poddaj się
                                    </button>
                                </div>
                                <ShipsContainer title='Zatopione statki' id='ships-set-container' className='Game-ships-container-horizontal'>
                                    <Ship className='Game-ship-set ship-3-horizontal' />
                                    <Ship className='Game-ship-set ship-4-horizontal' />
                                </ShipsContainer>
                            </>
                        }  
                    </div>
                </div>
                {
                    !localStorage.getItem('opponent') ? 
                    <div className='Game-info-layer'>
                        <div className='Game-info'>
                            <p>
                                Aby zagrać w Statki Online, zaproś znajomego do gry
                            </p>
                            <p>
                                <a href='/profile'>Przejdź do zakładki profil</a>
                            </p>
                        </div>
                    </div> : ''
                }
                {
                    localStorage.getItem('opponent') && all_ships_placed === false ?
                    <div className='Game-info-layer'>
                        <div className='Game-info text-center'>
                            <p>
                                Zanim zaczniesz grę musisz rozmieścić wszystkie statki
                            </p>
                            <div className='d-flex flex-row justify-content-center'>
                                <button className='btn btn-success rounded-0 px-3 mb-2' onClick={() => setAllShipsPlaced(null)}>
                                    OK
                                </button>
                            </div>
                        </div>
                    </div> : ''
                }
                {
                    localStorage.getItem('opponent') && surrender_screen === true ?
                    <div className='Game-info-layer'>
                        <div className='Game-info text-center'>
                            <p>
                                Czy na pewno chcesz się poddać?
                            </p>
                            <div className='d-flex flex-row justify-content-center'>
                                <button className='btn btn-success rounded-0 px-3 mb-2 mx-2' onClick={surrender}>
                                    Tak
                                </button>
                                <button className='btn btn-danger rounded-0 px-3 mb-2 mx-2' onClick={() => setSurrenderScreen(false)}>
                                    Nie
                                </button>
                            </div>
                        </div>
                    </div> : ''
                }
                {
                    
                    localStorage.getItem('opponent') && not_your_move_screen === true ?
                    <div className='Game-info-layer'>
                        <div className='Game-info text-center'>
                            <p>
                                Ruch przeciwnika, poczekaj na swoją kolej
                            </p>
                            <div className='d-flex flex-row justify-content-center'>
                                <button className='btn btn-success rounded-0 px-3 mb-2' onClick={() => setNotYourMoveScreen(false)}>
                                    OK
                                </button>
                            </div>
                        </div>
                    </div> : ''
                }
                {
                    
                    localStorage.getItem('opponent') && game_over === true ?
                    <div className='Game-info-layer'>
                        <div className='Game-info text-center px-5'>
                            <p>
                                Koniec gry
                                <br/>
                                {
                                    winner === 1 ? 
                                    <span className='text-success'>WYGRAŁEŚ</span> : 
                                    <span className='text-danger'>PRZEGRAŁEŚ</span>
                                }
                            </p>
                            <div className='d-flex flex-row justify-content-center'>
                                <button className='btn btn-success rounded-0 px-3 mb-2' onClick={() => setGameOver(false)}>
                                    OK
                                </button>
                            </div>
                        </div>
                    </div> : ''
                }
            </div>
    );
}

export default Game;