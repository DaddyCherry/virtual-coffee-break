import React, { useState, useEffect } from 'react';

function Timer() {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [inputTime, setInputTime] = useState("10:00");
    const [buttonText, setButtonText] = useState("Start");

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTime(time => time > 0 ? time - 1 : 0);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const calculateTimeInSeconds = (timeString) => {
        const [hours, minutes] = timeString.split(":").map(Number);
        const now = new Date();
        const target = new Date();
        target.setHours(hours, minutes, 0, 0);
        if (target < now) {
            target.setDate(target.getDate() + 1); // 翌日の時刻に設定
        }
        const diff = target - now;
        return Math.max(Math.floor(diff / 1000), 0);
    };

    const startCountdown = () => {
        const seconds = calculateTimeInSeconds(inputTime);
        setTime(seconds);
        setIsActive(true);
        setButtonText("Started"); // ボタンのテキストを変更
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    return (
        <div>
            <h1>{formatTime(time)}</h1>
            <input 
                type="text" 
                value={inputTime} 
                onChange={(e) => setInputTime(e.target.value)} 
                placeholder="HH:MM"
            />
            <button onClick={startCountdown}>
                {buttonText}
            </button>
        </div>
    );
}

export default Timer;