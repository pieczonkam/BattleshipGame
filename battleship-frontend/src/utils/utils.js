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

export { getRandomInt, prepareBoardMap, validateEmail };

