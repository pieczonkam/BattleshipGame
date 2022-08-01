import React from 'react';

function Square(props) {
    return (
        <div id={props.id} className={props.className}> 
            { props.children }
        </div>
    );
}

export default Square;