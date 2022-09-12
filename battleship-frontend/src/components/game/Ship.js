import React from 'react';

// Komponent statku
function Ship(props) {
    // Funkcja obsługująca zdarzenie rozpoczęcia przenoszenia elementu
    const dragStart = e => {
        localStorage.setItem('ship_id', e.target.id);
        
        setTimeout(() => {
            e.target.style.opacity = '0.5';
        }, 0);
    }

    // Funkcja obsługująca zdarzenie przeciągnięcia innego elementu
    const dragOver = e => {
        e.stopPropagation();
        e.preventDefault();
    }

    // Funkcja obsługująca zdarzenie zakończenia przenoszenia elementu
    const dragEnd = e => {
        localStorage.removeItem('ship_id');

        if (e.target.parentNode.classList.contains('Game-board-tile')) {
            e.target.parentNode.removeChild(document.getElementById(e.target.id));
        } else {
            e.target.style.opacity = '1.0';
        }
    }

    return (
        <div id={props.id} className={props.className} draggable={props.draggable} onDragStart={dragStart} onDragOver={dragOver} onDragEnd={dragEnd}></div>
    );
}

export default Ship;