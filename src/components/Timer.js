import React, { useState, useEffect } from 'react';
import './Timer.css'; // CSSファイルをインポート

function Timer() {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [inputTime, setInputTime] = useState("10:00");
    const [buttonText, setButtonText] = useState("Start");
    const [targetTime, setTargetTime] = useState("");
    const [blink, setBlink] = useState(true); // 点滅状態を管理するステート

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

    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setBlink(prev => !prev);
        }, 1000); // 1秒ごとに点滅
        return () => clearInterval(blinkInterval);
    }, []);

    const calculateTimeInSeconds = (timeString) => {
        const [hours, minutes] = timeString.split(":").map(Number);
        const now = new Date();
        const target = new Date();
        target.setHours(hours, minutes, 0, 0);
        if (target < now) {
            target.setDate(target.getDate() + 1); // 翌日の時刻に設定
        }
        const diff = target - now;
        return { 
            seconds: Math.max(Math.floor(diff / 1000), 0), 
            targetTime: target.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // HH:MM形式に変更
        };
    };

    const startCountdown = () => {
        const { seconds, targetTime } = calculateTimeInSeconds(inputTime);
        setTime(seconds);
        setTargetTime(targetTime);
        setIsActive(true);
        setButtonText("Started"); // ボタンのテキストを変更
    };

    const formatTime = (seconds) => {
        if (seconds >= 3600) {
            const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
            const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
            return (
                <span>
                    {h}
                    <span style={{ visibility: blink ? 'visible' : 'hidden' }}>:</span>
                    {m}
                </span>
            );
        } else {
            const m = Math.floor(seconds / 60).toString().padStart(2, '0');
            const s = (seconds % 60).toString().padStart(2, '0');
            return (
                <span>
                    {m}
                    <span style={{ visibility: blink ? 'visible' : 'hidden' }}>:</span>
                    {s}
                </span>
            );
        }
    };

    return (
        <div className="timer-container">
            <h1 className="timer-display">{formatTime(time)}</h1>
            <p className="timer-next-session">Next session start time is: {targetTime}</p>
            <input 
                type="text" 
                value={inputTime} 
                onChange={(e) => setInputTime(e.target.value)} 
                placeholder="HH:MM"
                className="timer-input"
            />
            <button onClick={startCountdown} className="timer-button">
                {buttonText}
            </button>
        </div>
    );
}

export default Timer;