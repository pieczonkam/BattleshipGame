import React, { useState, useEffect} from 'react'

// Komponent zegara
const Timer = (props) => {
    // Hook'i stanu
    const [minutes, setMinutes]                = useState(props.minutes);
    const [seconds, setSeconds]                = useState(props.seconds);
    const [current_minutes, setCurrentMinutes] = useState(0);
    const [current_seconds, setCurrentSeconds] = useState(0);
    
    // Hook efektu
    useEffect(() => {
        var delta_time = Math.floor(((new Date()).getTime() - props.current_time) / 1000);
        var time_total = props.minutes * 60 + props.seconds - delta_time;
        
        if (time_total < 0) {
            time_total = 0;
        }

        setMinutes(Math.floor(time_total / 60));
        setSeconds(time_total % 60);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.current_time]);

    // Hook efektu
    useEffect(() => {
        if (props.stop_time) {
            setCurrentMinutes(minutes);
            setCurrentSeconds(seconds);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.stop_time]);

    // Hook efektu
    useEffect(() => {
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    props.setTimeOver(true);
                    clearInterval(myInterval);
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000);
        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        <div className={props.className}>
        { 
            props.stop_time ? 
            <>
                <span className='Game-timer-digit bg-primary'>{current_minutes}</span>
                <span className='Game-timer-digit bg-primary'>:</span>
                <span className='Game-timer-digit bg-primary'>{Math.floor(current_seconds / 10)}</span>
                <span className='Game-timer-digit bg-primary'>{current_seconds % 10}</span>
            </> :
            minutes === 0 && seconds === 0 ?
            <>
                <span className='Game-timer-digit bg-primary'>0</span>
                <span className='Game-timer-digit bg-primary'>:</span>
                <span className='Game-timer-digit bg-primary'>0</span>
                <span className='Game-timer-digit bg-primary'>0</span>
            </>
            : 
            <>
                <span className='Game-timer-digit bg-primary'>{minutes}</span>
                <span className='Game-timer-digit bg-primary'>:</span>
                <span className='Game-timer-digit bg-primary'>{Math.floor(seconds / 10)}</span>
                <span className='Game-timer-digit bg-primary'>{seconds % 10}</span>
            </>
        }
        </div>
    )
}

export default Timer;