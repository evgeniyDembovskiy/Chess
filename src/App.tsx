import React, { useEffect, useState } from 'react';
import "./App.css"
import BoardComponent from './components/BoardComponent';
import LostFigures from './components/LostFigures';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';
import Timer from './components/Timer';

function App() {
    const [board, setBoard] = useState(new Board());
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    useEffect(() => {
        restart();
        setCurrentPlayer(whitePlayer);
    }, [])

    function restart() {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setCurrentPlayer(whitePlayer);
        setBoard(newBoard);
    }

    function swapPlayers() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
    }

    return (
        <div className='app'>
            <Timer
                restart={restart}
                currentPlayer={currentPlayer}
                setCurrentPlayer={setCurrentPlayer}
                whitePlayer={whitePlayer}

            />
            <BoardComponent
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                swapPlayers={swapPlayers}
            />
            <div className='numbers'>
                <div>8</div>
                <div>7</div>
                <div>6</div>
                <div>5</div>
                <div>4</div>
                <div>3</div>
                <div>2</div>
                <div>1</div>
            </div>
            <div>
                <LostFigures 
                    title="Потерянные черные фигуры:" 
                    figures={board.lostBlackFigures}/>
                <LostFigures 
                    title="Потерянные белые фигуры:" 
                    figures={board.lostWhiteFigures}/>
            </div>


        </div>
    );
}

export default App;
