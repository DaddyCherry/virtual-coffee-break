import React, { useState, useEffect } from 'react';

function Timer() {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [inputTime, setInputTime] = useState(60);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTime(time => time > 0 ? time - 1 : 0);
            }, 1000);
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, time]);

    const startCountdown = () => {
        setTime(inputTime);
        setIsActive(true);
    };

    return (
        <div>
            <h1>{time}s</h1>
            <input 
                type="number" 
                value={inputTime} 
                onChange={(e) => setInputTime(Number(e.target.value))} 
            />
            <button onClick={startCountdown}>
                Start Countdown
            </button>
        </div>
    );
}

export default Timer;