import { React, useState } from 'react';
import Button              from 'react-bootstrap/Button';
import Collapse            from 'react-bootstrap/Collapse';

function CollapseComponent(props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(!open)} aria-controls={props.aria_controls} aria-expanded={open} className={props.button_className}>
                {props.button_text}
                {
                    props.notifications_count && props.notifications_count > 0 ?
                    <div className='notification bg-danger'>{props.notifications_count}</div> : ''
                }
            </Button>
            <Collapse in={open}>
                <div id={props.aria_controls} className={props.collapse_className}>
                    {props.children}
                </div>
            </Collapse>
        </>
    );
}

export default CollapseComponent;