import { React, useState } from 'react';
import Button              from 'react-bootstrap/Button';
import Collapse            from 'react-bootstrap/Collapse';

function ChangeUserData(props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(!open)} aria-controls={props.aria_controls} aria-expanded={open} className={props.button_className}>
                {props.button_text}
            </Button>
            <Collapse in={open}>
                <div id={props.aria_controls} className={props.collapse_className}>
                    {props.children}
                </div>
            </Collapse>
        </>
    );
}

export default ChangeUserData;