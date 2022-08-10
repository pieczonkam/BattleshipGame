import React from 'react';

function Board(props) {
    const drop = e => {
        e.preventDefault();

        const boat_id = e.dataTransfer.getData('boat_id');
        const boat    = document.getElementById(boat_id);
        
        e.target.appendChild(boat);
    }
    
    const dragOver = e => {
        e.preventDefault();
    }

    return (
        <div id={props.id} className={props.className} onDrop={drop} onDragOver={dragOver}>
            { props.children }
        </div>
    );
}

export default Board;