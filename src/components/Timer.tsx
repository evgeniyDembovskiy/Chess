import React, { FC, useState, useRef, useEffect} from 'react';
import { Colors } from '../models/Colors';
import { Player } from './../models/Player';

interface TimerProps {
    currentPlayer: Player | null;
    setCurrentPlayer: (player: Player | null) => void;
    whitePlayer: Player | null;
    restart: () => void;
}


const Timer: FC<TimerProps> = ({currentPlayer, restart, setCurrentPlayer, whitePlayer}) => {
    const [timeLimitWhite, setTimeLimitWhite] = useState(300);
    const [timeLimitBlack, setTimeLimitBlack] = useState(300);
    const [blackTime, setBlackTime] = useState(300);
    const [whiteTime, setWhiteTime] = useState(300);
    const timerIsStarted = useRef(false);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)
    
    // console.log(currentPlayer);

    useEffect(() => {
        startTimer();
    }, [currentPlayer])

    useEffect(() => {
        if(blackTime < 0) {
            if(timer.current) {
                clearInterval(timer.current)
            }
            alert("У черных закончилось время, белые победили!");
            handleRestart()
        } else if (whiteTime < 0) {
            if(timer.current) {
                clearInterval(timer.current)
            }
            alert("У белых закончилось время, черные победили!");
            handleRestart()
        }
    }, [blackTime, whiteTime])

    function startTimer() {
        if(!timerIsStarted.current) {
            return
        }
        if(timer.current) {
            clearInterval(timer.current)
        }

        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
        timer.current = setInterval(callback, 1000)
    }

    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1);
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1);
    }

    const handleRestart = () => {
        setWhiteTime(timeLimitWhite);
        setBlackTime(timeLimitBlack);
        restart();
        if(timer.current) {
            clearInterval(timer.current)
        }
        timerIsStarted.current = false;
        setCurrentPlayer(whitePlayer);
    }

    const handleTimerStart = () => {
        timerIsStarted.current = true;
        startTimer();
    }

    const changeTimeLimitWhite = (e: any) => {
        setTimeLimitWhite(+e.target.value);
    }

    const changeTimeLimitBlack = (e: any) => {
        setTimeLimitBlack(+e.target.value);
    }

    useEffect(() => {
        setBlackTime(timeLimitBlack);
    }, [timeLimitBlack])

    useEffect(() => {
        setWhiteTime(timeLimitWhite);
    }, [timeLimitWhite])

    return (
        <div className='timer'>
            <form action="">
                <h2>Ограничение времени</h2>
                <input 
                    className='timer__input'
                    type="number" 
                    onChange={changeTimeLimitBlack}
                    placeholder="Ограничение времени для черных"/>
                <input 
                    className='timer__input'
                    type="number" 
                    onChange={changeTimeLimitWhite}
                    placeholder="Ограничение времени для белых"/>
            </form>
            <div>
                <h2>Черные - {blackTime} сек.</h2>
                <h2>Белые - {whiteTime} сек.</h2>
                <div className='timer__btns'>
                    <button className='timer__btn' onClick={handleRestart}>Перезапустить игру</button>
                    <button className='timer__btn' onClick={handleTimerStart}>Запустить часы</button>
                </div>
            </div>
        </div>
    );
};

export default Timer;