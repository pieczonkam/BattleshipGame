import { BOARD_SIZE } from "./constants";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
}

function prepareBoardMap(board_size) {
    var board_map = [];

    for (let i = 0; i < BOARD_SIZE; ++i) {
        var board_map_row = [];
        for (let j = 0; j < BOARD_SIZE; ++j) {
            board_map_row.push(false);
        }

        board_map.push(board_map_row);
    }

    return board_map;
}

export { getRandomInt, prepareBoardMap };

