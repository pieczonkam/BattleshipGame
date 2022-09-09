const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
}

const prepareBoardMap = (board_size) => {
    var board_map = [];

    for (let i = 0; i < board_size; ++i) {
        var board_map_row = [];
        for (let j = 0; j < board_size; ++j) {
            board_map_row.push(0);
        }

        board_map.push(board_map_row);
    }

    return board_map;
}

const validateEmail = (email) => {
    let email_valid = String(email)
          .toLowerCase()
          .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ) === null ? false : true;
    return email_valid;
}

const clearGameData = () => {
    localStorage.removeItem('your_move');
    localStorage.removeItem('opponent');
    localStorage.removeItem('ship_id');
    localStorage.removeItem('game_started');
    localStorage.removeItem('you_ready');
    localStorage.removeItem('opponent_ready');
    localStorage.removeItem('yout_hits');
    localStorage.removeItem('opponent_hits');
    localStorage.removeItem('board_map');
    localStorage.removeItem('your_hits_map');
    localStorage.removeItem('opponent_hits_map');
    localStorage.removeItem('ships_set');
}

const switchNavLink = (nav_link) => {
    const nav_links = [
        'navlink-1',
        'navlink-2',
        'navlink-3',
        'navlink-4',
        'navlink-5'
    ]

    for (const nl of nav_links) {
        let el = document.getElementById(nl);

        if (el) {
            if (nl !== nav_link) {
                el.classList.remove('active');
            } else {
                el.classList.add('active');
            }
        }
    }
}

const isShipSunk = (hits_map, ship_parameters) => {
    if (ship_parameters.orientation === 'horizontal') {
        for (let i = 0; i < ship_parameters.length; ++i) {
            if (hits_map[ship_parameters.x + i][ship_parameters.y] !== 2) {
                return false;
            }
        }
    } else {
        for (let i = 0; i < ship_parameters.length; ++i) {
            if (hits_map[ship_parameters.x][ship_parameters.y] !== 2) {
                return false;
            }
        }
    }

    return true;
}

export { getRandomInt, prepareBoardMap, validateEmail, clearGameData, switchNavLink, isShipSunk };

