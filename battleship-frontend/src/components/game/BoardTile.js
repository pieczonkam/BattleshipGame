import React          from 'react';

import { BOARD_SIZE } from '../../utils/constants';

function BoardTile(props) {
    const shipPositionValid = (target, ship) => {

        // console.log(props.board_map);
        // Check if tile is already occupied
        if (target.hasChildNodes()) {
            return false;
        }
    
        var ship_class       = [...ship.classList].filter(el => el !== 'Game-ship')[0];
        var ship_length      = parseInt(ship_class.split('-')[1]) + 1;
        var ship_orientation = ship_class.split('-')[2]; 

        var tile_type = target.id.split('-')[1];
        var tile_row  = parseInt(target.id.split('-')[2]);
        var tile_col  = parseInt(target.id.split('-')[3]);
        
        // Check if new ship fits on the board
        if (ship_orientation === 'horizontal' && (tile_col + ship_length - 1) > BOARD_SIZE) {
            return false;
        }

        if (ship_orientation === 'vertical' && (tile_row + ship_length - 1) > BOARD_SIZE) {
            return false;
        }

        // var reserved_tiles = [];
        // if (ship_orientation === 'horizontal') {
        //     for (let i = tile_row - 1; i <= tile_row + 1; ++i) {
        //         for (let j = tile_col - 1; j <= tile_col + ship_length; ++j) {
        //             let reserved_tile = document.getElementById('board-' + tile_type + '-' + (i) + '-' + (j));
        //             if (reserved_tile && reserved_tile.classList.contains('Game-board-tile')) {
        //                 reserved_tiles.push(reserved_tile);
        //             }
        //         }
        //     }
        // } else if (ship_orientation === 'vertical') {

        // }

        // console.log(reserved_tiles);

        // // Check if there is any ship behind
        // var other_ship;
        // for (let i = -5; i < 0; ++i) {
        //     let other_tile = document.getElementById('board-' + tile_type + '-' + (tile_row) + '-' + (tile_col + i));
        //     if (other_tile && other_tile.classList.contains('Game-board-tile') && other_tile.hasChildNodes()) {
        //         other_ship = other_tile.firstChild;
        //     }
        // }

        // if (other_ship) {
        //     var other_ship_class  = [...other_ship.classList].filter(el => el !== 'Game-ship')[0]
        //     var other_ship_length = parseInt(other_ship_class.split('-')[1]) + 1;

        //     console.log(other_ship);
        //     console.log(other_ship_length);
        // }
        
        // // Check if ships overlap (+ additional margin of 1 tile in each direction)
        // if (ship_orientation === 'horizontal') {
        //     for (let i = - 1; i <= 1; ++i) {
        //         for (let j = -5; j <= ship_length; ++j) {
        //             if (i === 0 && j === 0) continue;
    
        //             let other_tile = document.getElementById('board-' + tile_type + '-' + (tile_row + i) + '-' + (tile_col + j));
        //             if (other_tile && other_tile.classList.contains('Game-board-tile') && other_tile.hasChildNodes()) {
        //                 return false;
        //             }
        //         }
        //     }
        // }
        
        var board_map = props.board_map;

        if (ship_orientation === 'horizontal') {
            for (let i = tile_row - 2; i <= tile_row; ++i) {
                for (let j = tile_col - 2; j <= tile_col + ship_length - 1; ++j) {
                    if (i >= 0 && i < BOARD_SIZE && j >= 0 && j < BOARD_SIZE) {
                        if (board_map[i][j]) console.log('Overlap');
                        board_map[i][j] = true
                    }
                }
            }
        }

        props.setBoardMap(board_map);

        return true;
    }

    const drop = e => {
        e.preventDefault();

        if (e.target.classList.contains('Game-ship')) {
            e.target = e.target.parentNode;
        }

        var tile_id_split = e.target.id.split('-');
        var tile_bg_id    = tile_id_split[0] + '-' + tile_id_split[1] + '-bg-' + tile_id_split[2] + '-' + tile_id_split[3];

        var tile_bg = document.getElementById(tile_bg_id);
        if (tile_bg) {
            tile_bg.style.backgroundColor = 'aqua';
        }

        const ship_id = localStorage.getItem('ship_id');
        const ship    = document.getElementById(ship_id);

        if (!ship) {
            return;
        }

        if(shipPositionValid(e.target, ship)) {
            const ship_clone = ship.cloneNode(true);

            ship_clone.draggable     = false;    
            ship_clone.style.cursor  = 'default';
            ship_clone.style.opacity = '1.0';

            e.target.appendChild(ship);
            e.target.appendChild(ship_clone);
        } else {
            document.getElementById('ship-container').appendChild(ship);
        }        
    }
    
    const dragOver = e => {
        e.preventDefault();
    }

    const dragEnter = e => {
        e.preventDefault();

        if (e.target.classList.contains('Game-ship')) {
            e.target = e.target.parentNode;
        }

        var tile_id_split = e.target.id.split('-');
        var tile_bg_id    = tile_id_split[0] + '-' + tile_id_split[1] + '-bg-' + tile_id_split[2] + '-' + tile_id_split[3];

        var tile_bg = document.getElementById(tile_bg_id);
        if (tile_bg) {
            tile_bg.style.backgroundColor = 'blue';
        }
    }

    const dragLeave = e => {
        e.preventDefault();
    
        if (e.target.classList.contains('Game-ship')) {
            e.target = e.target.parentNode;
        }

        var tile_id_split = e.target.id.split('-');
        var tile_bg_id    = tile_id_split[0] + '-' + tile_id_split[1] + '-bg-' + tile_id_split[2] + '-' + tile_id_split[3];

        var tile_bg = document.getElementById(tile_bg_id);
        if (tile_bg) {
            tile_bg.style.backgroundColor = 'aqua';
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
            <div id={id_str} className='Game-board-tile' onDragOver={dragOver} onDragLeave={dragLeave} onDragEnter={dragEnter} onDrop={drop}></div>
        );
    } else if (props.type === 'a-bg') {
        return (
            <div id={id_str} className='Game-board-tile-bg'></div>
        );
    } else if (props.type === 'b') {
        return (
            <div id={id_str} className='Game-board-tile-bg'></div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

export default BoardTile;