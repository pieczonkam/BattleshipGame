import React from 'react';

function ShipsContainer(props) {
    const drop = e => {
        e.preventDefault();

        if (e.target.classList.contains('Game-ship')) {
            e.target = e.target.parentNode;
        }

        const ship_id = localStorage.getItem('ship_id');
        const ship    = document.getElementById(ship_id);

        if (!ship) {
            return;
        }

        ship.style.opacity = '1.0';
        e.target.appendChild(ship);
    }
    
    const dragOver = e => {
        e.preventDefault();
    }

    return (        
        <div id={props.id} className={props.className} onDragOver={dragOver} onDrop={drop}>
            {props.children}
        </div>
    );
}

export default ShipsContainer;