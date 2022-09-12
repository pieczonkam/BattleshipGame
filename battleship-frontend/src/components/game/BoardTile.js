import React             from 'react';
import { useNavigate }   from 'react-router-dom';

import { clearGameData, 
       prepareBoardMap } from '../../utils/utils';
import { BOARD_SIZE }    from '../../utils/constants';

// Komponent kafelka na planszy
function BoardTile(props) {
    // Hook nawigacji
    const navigate = useNavigate();

    // Funkcja sprawdzająca, czy ustawienie statku na planszy jest poprawne
    const shipPositionValid = (target, ship) => {
        // Check if tile is already occupied
        if (target.hasChildNodes()) {
            return false;
        }
    
        var ship_class       = [...ship.classList].filter(el => el !== 'Game-ship')[0];
        var ship_length      = parseInt(ship_class.split('-')[1]) + 1;
        var ship_orientation = ship_class.split('-')[2]; 

        var tile_row  = parseInt(target.id.split('-')[2]);
        var tile_col  = parseInt(target.id.split('-')[3]);
        
        // Check if new ship fits on the board
        if (ship_orientation === 'horizontal' && (tile_col + ship_length - 1) > BOARD_SIZE) {
            return false;
        }

        if (ship_orientation === 'vertical' && (tile_row + ship_length - 1) > BOARD_SIZE) {
            return false;
        }

        // Check if ship overlaps with any other ship
        var board_map = JSON.parse(localStorage.getItem('board_map'));
        if (!board_map) {
            board_map = prepareBoardMap(BOARD_SIZE);
        }
        
        if (ship_orientation === 'horizontal') {
            for (let i = tile_col - 1; i <= tile_col + ship_length - 2; ++i) {
                if (board_map[tile_row - 1][i] === 1 || board_map[tile_row - 1][i] === 2) {
                    return false;
                }
            }
        }

        if (ship_orientation === 'vertical') {
            for (let i = tile_row - 1; i <= tile_row + ship_length - 2; ++i){
                if (board_map[i][tile_col - 1] === 1 || board_map[i][tile_col - 1] === 2) {
                    return false;
                }
            }
        }

        // Set ship on the board (with extra space around)
        var row_size = ship_orientation === 'horizontal' ? 0 : (ship_length - 1);
        var col_size = ship_orientation === 'horizontal' ? (ship_length - 1) : 0;

        for (let i = tile_row - 2; i <= tile_row + row_size; ++i) {
            for (let j = tile_col - 2; j <= tile_col + col_size; ++j) {
                if (i >= 0 && i < BOARD_SIZE && j >= 0 && j < BOARD_SIZE) {
                    if ((i >= tile_row - 1 && i <= tile_row + row_size - 1) && (j >= tile_col - 1 && j <= tile_col + col_size - 1)) {
                        board_map[i][j] = 2;
                    } else {
                        board_map[i][j] = 1;
                    }
                }
            }
        }

        localStorage.setItem('board_map', JSON.stringify(board_map));

        return true;
    }

    // Funkcja ustawiająca kolor tła planszy A
    const setBoardABgColor = (tile, ship, mode) => {
        var ship_class       = [...ship.classList].filter(el => el !== 'Game-ship')[0];
        var ship_length      = parseInt(ship_class.split('-')[1]) + 1;
        var ship_orientation = ship_class.split('-')[2]; 

        var tile_id_split = tile.id.split('-');
        var tile_row      = parseInt(tile_id_split[2]);
        var tile_col      = parseInt(tile_id_split[3]);
        
        var ship_tiles = [];
        if (ship_orientation === 'horizontal') {
            for (let i = tile_col; i < tile_col + ship_length; ++i) {
                if (i <= BOARD_SIZE) {
                    ship_tiles.push(tile_id_split[0] + '-' + tile_id_split[1] + '-bg-' + tile_row + '-' + i);
                }
            }
        } else {
            for (let i = tile_row; i < tile_row + ship_length; ++i) {
                if (i <= BOARD_SIZE) {
                    ship_tiles.push(tile_id_split[0] + '-' + tile_id_split[1] + '-bg-' + i + '-' + tile_col);
                }
            }
        }

        var board_map = JSON.parse(localStorage.getItem('board_map'));
        if (!board_map) {
            board_map = prepareBoardMap(BOARD_SIZE);
        }

        if (mode === 'on') {
            for (let i = 0; i < ship_tiles.length; ++i) {
                let row_nmb = ship_tiles[i].split('-')[3];
                let col_nmb = ship_tiles[i].split('-')[4];
    
                if (board_map[row_nmb - 1][col_nmb - 1] === 1 || board_map[row_nmb - 1][col_nmb - 1] === 2) {
                    document.getElementById(ship_tiles[i]).style.backgroundColor ='rgb(214, 83, 83)';
                } else {
                    document.getElementById(ship_tiles[i]).style.backgroundColor = 'rgb(44, 160, 163)';
                }
            }
        } else {
            for (let i = 0; i < ship_tiles.length; ++i) {
                document.getElementById(ship_tiles[i]).style.backgroundColor = 'rgb(0, 247, 255)';
            }
        }
    }

    // Funkcja obsługująca zdarzenie upuszczenia innego elementu
    const drop = e => {
        e.preventDefault();

        if (e.target.classList.contains('Game-ship') || e.target.classList.contains('Game-ship-set')) {
            e.target = e.target.parentNode;
        }

        const ship_id = localStorage.getItem('ship_id');
        const ship    = document.getElementById(ship_id);

        if (!ship) {
            return;
        }

        setBoardABgColor(e.target, ship, 'off');
        props.setDragOverUpdate(true);

        if(shipPositionValid(e.target, ship)) {
            const ship_clone = ship.cloneNode(true);

            ship_clone.draggable     = false;    
            ship_clone.style.opacity = '1.0';
            ship_clone.classList.add('Game-ship-set');
            ship_clone.classList.remove('Game-ship');

            e.target.appendChild(ship);
            e.target.appendChild(ship_clone);

            var ship_class       = [...ship.classList].filter(el => el !== 'Game-ship')[0];
            var ship_length      = parseInt(ship_class.split('-')[1]) + 1;
            var ship_orientation = ship_class.split('-')[2];
            
            var tile_row = parseInt(e.target.id.split('-')[2]);
            var tile_col = parseInt(e.target.id.split('-')[3]);

            var ships_set_arr = JSON.parse(localStorage.getItem('ships_set'));
            if (ships_set_arr) {
                ships_set_arr.push(String(ship_id + '|' + ship_length + ' ' + ship_orientation + ' ' + tile_row + ' ' + tile_col));
            } else {
                ships_set_arr = [String(ship_id + '|' + ship_length + ' ' + ship_orientation + ' ' + tile_row + ' ' + tile_col)];
            }

            localStorage.setItem('ships_set', JSON.stringify(ships_set_arr));
        } else {
            document.getElementById('ships-container').appendChild(ship);
        }        
    }
    
    // Funkcja obsługująca zdarzenie przeciągnięcia innego elementu nad
    const dragOver = e => {
        e.preventDefault();

        if (props.drag_over_update) {
            if (e.target.classList.contains('Game-ship') || e.target.classList.contains('Game-ship-set')) {
                e.target = e.target.parentNode;
            }
    
            const ship_id = localStorage.getItem('ship_id');
            const ship    = document.getElementById(ship_id);
    
            if (!ship) {
                return;
            }
    
            setBoardABgColor(e.target, ship, 'on');
            props.setDragOverUpdate(false);
        }
    }

    // Funkcja obsługująca zdarzenie przeciągnięcia innego elementy poza
    const dragLeave = e => {
        e.preventDefault();

        if (e.target.classList.contains('Game-ship') || e.target.classList.contains('Game-ship-set')) {
            e.target = e.target.parentNode;
        }

        const ship_id = localStorage.getItem('ship_id');
        const ship    = document.getElementById(ship_id);

        if (!ship) {
            return;
        }

        setBoardABgColor(e.target, ship, 'off');
        props.setDragOverUpdate(true);
    }

    // Funkcja obsługująca zdarzenie kliknięcia na planszy B
    const onBoardBClick = e => {
        if (localStorage.getItem('game_started') === 'true') {
            var opponent = localStorage.getItem('opponent');
        
            if (opponent) {
                if (localStorage.getItem('your_move') === 'true') {
                    if (!(e.target.classList.contains('Game-board-tile-bg-b-clicked-hit') || e.target.classList.contains('Game-board-tile-bg-b-clicked-miss'))) {
                        props.setYourMove(false);
                        localStorage.setItem('your_move', 'false');
                        
                        var tile_id  = e.target.id.split('-');
                        var tile_row = parseInt(tile_id[2]) - 1;
                        var tile_col = parseInt(tile_id[3]) - 1;
                        
                        props.sendWsMessage(opponent, tile_row + ' ' + tile_col, 'COORDINATES');

                        let ct = (new Date()).getTime();
                        
                        props.sendWsMessage(opponent, JSON.stringify(ct), 'TIME');
                        props.setCurrentTime(ct);
                        localStorage.setItem('current_time', String(ct));

                        e.target.className = 'Game-board-tile-bg-b-clicked-miss';
                    }
                } else {
                    props.setNotYourMoveScreen(true);
                }
            }
            else {
                clearGameData();
                navigate('/profile');
            }
        }
    }

    var id_str = 'board-' + props.type + '-' + (props.x) + '-' + (props.y);

    if (props.x === 0 && props.y === 0) {
        return (
            <div id={id_str} className='Game-board-tile-text'></div>
        );
    }

    if (props.x === 0) {
        if (props.type === 'a-bg') {
            return (
                <div id={id_str} className='Game-board-tile-text'></div>
            );
        }

        return (
            <div id={id_str} className='Game-board-tile-text'>{String.fromCharCode(64 + props.y)}</div>
        );
    }

    if (props.y === 0) {
        if (props.type === 'a-bg') {
            return (
                <div id={id_str} className='Game-board-tile-text'></div>
            );
        }

        return (
            <div id={id_str} className='Game-board-tile-text'>{props.x}</div>
        );
    }

    if (props.type === 'a') {
        return (
            <div id={id_str} className='Game-board-tile' onDragOver={dragOver} onDragLeave={dragLeave} onDrop={drop}>
                {props.children}
            </div>
        );
    } else if (props.type === 'a-bg') {
        var opponent_hits_map = JSON.parse(localStorage.getItem('opponent_hits_map'));
        if (!opponent_hits_map) {
            opponent_hits_map = prepareBoardMap(BOARD_SIZE);
        }

        if (opponent_hits_map[props.x - 1][props.y - 1] === 2) {
            return (
                <div id={id_str} className='Game-board-tile-bg-a-hit'></div>
            ); 
        }

        if (opponent_hits_map[props.x - 1][props.y - 1] === 1) {
            return (
                <div id={id_str} className='Game-board-tile-bg-a-miss'></div>
            ); 
        }

        return (
            <div id={id_str} className='Game-board-tile-bg-a'></div>
        );
    } else if (props.type === 'b') {
        var your_hits_map = JSON.parse(localStorage.getItem('your_hits_map'));
        if (!your_hits_map) {
            your_hits_map = prepareBoardMap(BOARD_SIZE);
        }

        if (your_hits_map[props.x - 1][props.y - 1] === 2) {
            return (
                <div id={id_str} className='Game-board-tile-bg-b-clicked-hit'></div>
            );
        }

        if (your_hits_map[props.x - 1][props.y - 1] === 1) {
            return (
                <div id={id_str} className='Game-board-tile-bg-b-clicked-miss'></div>
            );
        }

        return (
            <div id={id_str} className='Game-board-tile-bg-b' onClick={onBoardBClick}></div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

export default BoardTile;