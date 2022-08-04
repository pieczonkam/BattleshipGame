import React from 'react';

function Square(props) {
    return (
        <div id={props.id} className={props.className} onClick={props.onClick}> 
            { props.children }
        </div>
    );
}

export default Square;