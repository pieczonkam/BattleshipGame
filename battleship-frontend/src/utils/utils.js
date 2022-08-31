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

const clearLocalStorage = () => {
    localStorage.removeItem('your_move');
    localStorage.removeItem('opponent');
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

export { getRandomInt, prepareBoardMap, validateEmail, clearLocalStorage, switchNavLink };

