import React from 'react';

function Boat(props) {
    const dragStart = e => {
        e.dataTransfer.setData('boat_id', e.target.id);

        setTimeout(() => {
            e.target.style.opacity = '0.5';
            // e.target.style.display = 'none';
        }, 0);
    }

    const dragOver = e => {
        e.stopPropagation();
    }

    const dragEnd = e => {
        e.target.style.opacity = '1.0';
        // e.target.style.display = 'block';
    }

    return (
        <div id={props.id} className={props.className} draggable={props.draggable} onDragStart={dragStart} onDragOver={dragOver} onDragEnd={dragEnd}> 
            { props.children }
        </div>
    );
}

export default Boat;